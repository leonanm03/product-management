import { Injectable } from '@nestjs/common'
import { ProductsRepository } from '../products.repository'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getById(code: number) {
    return this.prisma.products.findUnique({
      where: { code }
    })
  }
  async update(code: number, data: Prisma.productsUpdateInput) {
    return this.prisma.products.update({
      where: { code },
      data
    })
  }
}
