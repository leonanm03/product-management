import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { ProductsModule } from './modules/products/products.module';
import { PacksModule } from './modules/packs/packs.module';

@Module({
  imports: [PrismaModule, ProductsModule, PacksModule],
  controllers: [],
  providers: []
})
export class AppModule {}
