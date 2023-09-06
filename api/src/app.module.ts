import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
