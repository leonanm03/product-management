import { Type } from 'class-transformer'
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  ValidateNested
} from 'class-validator'

export class UpdateProductsDto {
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  code: number

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  sales_price: number
}

export class UpdateProductsDtoArray {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductsDto)
  products: UpdateProductsDto[]
}
