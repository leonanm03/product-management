import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common'
import { ProductsService } from './products.service'
import {
  UpdateProductsDto,
  UpdateProductsDtoArray
} from './dto/update-products.dto'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/validation')
  updateValidation(@Body() updateProductsDtoArray: UpdateProductsDtoArray) {
    return this.productsService.validate(updateProductsDtoArray)
  }

  @Patch('/update')
  updateMany(@Body() updateProductsDtoArray: UpdateProductsDtoArray) {
    return this.productsService.updateMany(updateProductsDtoArray)
  }
}
