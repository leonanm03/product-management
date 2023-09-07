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
  updateValidation(@Body() products: UpdateProductsDtoArray) {
    console.log(products)
    return this.productsService.validate(products)
  }

  @Get()
  findAll() {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductsDto) {
    return this.productsService.update(+id, updateProductDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id)
  }
}
