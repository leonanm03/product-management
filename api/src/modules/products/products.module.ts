import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { ProductsRepository } from './repositories/products.repository'
import { PrismaProductsRepository } from './repositories/implementations/prisma-products.repository'
import { PacksRepository } from '../packs/repositories/packs.repository'
import { PrismaPacksRepository } from '../packs/repositories/implementations/prisma-packs.repository'

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository
    },

    {
      provide: PacksRepository,
      useClass: PrismaPacksRepository
    }
  ]
})
export class ProductsModule {}
