import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UpdateProductsDtoArray } from './dto/update-products.dto'
import { ProductsRepository } from './repositories/products.repository'
import { PacksRepository } from '../packs/repositories/packs.repository'

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository,
    private readonly packsRepository: PacksRepository
  ) {}

  async validate({ products }: UpdateProductsDtoArray) {
    const items = []

    for (const { code, sales_price } of products) {
      const problems = []
      const item = await this.productsRepository.getByCode(code)
      if (!item) items.push({ code, problems: ['Produto não encontrado'] })
      if (item) {
        if (Number(item.cost_price) > sales_price)
          problems.push(`O preço de venda não pode ser menor que o de custo`)

        const percentage = this.diferencePercentage(
          Number(item.sales_price),
          sales_price
        )
        if (percentage > 10)
          problems.push(`A mudança de preço não pode ser maior que 10%`)

        const product_in_pack = await this.packsRepository.getPackByproductCode(
          code
        )
        if (product_in_pack) {
          const packs = await this.packsRepository.getManyByCode(
            Number(product_in_pack.pack_id)
          )

          const pack_product = products.find(
            (item) => item.code === Number(product_in_pack.pack_id)
          )

          if (!pack_product) {
            problems.push(
              `O preço do pacote precisa ser igual a soma dos preços dos seus produtos`
            )
          } else {
            let price_sum = 0
            for (const pack of packs) {
              let product = products.find(
                (item) => item.code === Number(pack.product_id)
              )
              if (!product) {
                const get_product = await this.productsRepository.getByCode(
                  Number(pack.product_id)
                )
                if (get_product)
                  product = {
                    code: Number(get_product.code),
                    sales_price: Number(get_product.sales_price)
                  }
              }
              if (product)
                price_sum += Number(product.sales_price) * Number(pack.qty)
            }
            if (price_sum !== pack_product.sales_price)
              problems.push(
                `O preço do pacote precisa ser igual a soma dos preços dos seus produtos`
              )
          }
        }

        const packs = await this.packsRepository.getManyByCode(code)
        if (packs.length > 0) {
          let price_sum = 0
          for (const pack of packs) {
            let product = products.find(
              (item) => item.code === Number(pack.product_id)
            )

            if (!product) {
              const get_product = await this.productsRepository.getByCode(
                Number(pack.product_id)
              )
              if (get_product)
                product = {
                  code: Number(get_product.code),
                  sales_price: Number(get_product.sales_price)
                }
            }

            if (product) {
              price_sum += product.sales_price * Number(pack.qty)
            }
          }
          if (price_sum !== sales_price)
            problems.push(
              `O preço do pacote precisa ser igual a soma dos preços dos seus produtos`
            )
        }

        items.push({
          code,
          name: item.name,
          sales_price: Number(item.sales_price),
          new_price: Number(sales_price),
          problems
        })
      }
    }

    return items
  }

  async updateMany({ products }: UpdateProductsDtoArray) {
    const validation = await this.validate({ products })
    const found_errors = validation.filter((item) => item.problems.length > 0)
    if (found_errors.length > 0)
      throw new HttpException(
        'Problem with some products',
        HttpStatus.UNPROCESSABLE_ENTITY,
        { cause: found_errors }
      )

    for (const { code, sales_price } of products) {
      await this.productsRepository.update(code, { sales_price })
    }

    return { message: 'Produtos atualizados' }
  }

  diferencePercentage(old_price: number, new_price: number) {
    const fraction = (new_price - old_price) / old_price
    return Math.abs(fraction * 100)
  }
}
