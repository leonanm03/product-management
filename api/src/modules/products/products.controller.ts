import { Controller, Body, Patch, Post } from '@nestjs/common'
import { ProductsService } from './products.service'
import { UpdateProductsDtoArray } from './dto/update-products.dto'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/validation')
  updateValidation(@Body() updateProductsDtoArray: UpdateProductsDtoArray) {
    return this.productsService.validate(updateProductsDtoArray)
  }

  @Patch('/update')
  updateMany(@Body() updateProductsDtoArray: UpdateProductsDtoArray) {
    return this.productsService.updateMany(updateProductsDtoArray)
  }
}
