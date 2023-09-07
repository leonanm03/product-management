import { Injectable } from '@nestjs/common'
import {
  UpdateProductsDto,
  UpdateProductsDtoArray
} from './dto/update-products.dto'
import { ProductsRepository } from './repositories/products.repository'
import { PacksRepository } from '../packs/repositories/packs.repository'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly packsRepository: PacksRepository
  ) {}

  async validate({ products }: UpdateProductsDtoArray) {
    const problems = []

    for (const { code, sales_price } of products) {
      const item = await this.productsRepository.getByCode(code)
      if (!item) problems.push({ code, message: 'Product not found' })
      if (item) {
        if (Number(item.cost_price) > sales_price)
          problems.push({
            code,
            message: 'Sales price is less than cost price'
          })

        const percentage = this.diferencePercentage(
          Number(item.sales_price),
          sales_price
        )
        if (percentage > 10)
          problems.push({ code, message: 'Difference greater than 10%' })

        const packs = await this.packsRepository.getManyByCode(code)
        if (packs.length > 0) {
        }
      }
    }

    return problems
  }

  findAll() {
    return `This action returns all products`
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductsDto: UpdateProductsDto) {
    return `This action updates a #${id} product`
  }
  remove(id: number) {
    return `This action removes a #${id} product`
  }

  diferencePercentage(old_price: number, new_price: number) {
    const fraction = (new_price - old_price) / old_price
    return Math.abs(fraction * 100)
  }
}
