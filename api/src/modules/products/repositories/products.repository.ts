import { Prisma, products } from '@prisma/client'

export abstract class ProductsRepository {
  abstract getByCode(code: number): Promise<products>
  abstract update(
    code: number,
    data: Prisma.productsUpdateInput
  ): Promise<products>
}
