import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { ProductsRepository } from './repositories/products.repository'
import { PrismaProductsRepository } from './repositories/implementations/prisma-products.repository'

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository
    }
  ]
})
export class ProductsModule {}
