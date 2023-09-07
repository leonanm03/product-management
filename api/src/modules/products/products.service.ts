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
          let price_sum = 0
          for (const pack of packs) {
            const product = products.find(
              (item) => item.code === Number(pack.product_id)
            )
            if (!product) {
              problems.push({
                code,
                message: 'You must update the unpacked product too'
              })
              break
            } else price_sum += product.sales_price * Number(pack.qty)
          }

          if (price_sum && price_sum !== sales_price)
            problems.push({
              code,
              message: 'Pack price is different from the sum of the products'
            })
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
