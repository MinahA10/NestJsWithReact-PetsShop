import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: Text;

  @IsNotEmpty()
  price: Float32Array;

  @IsNotEmpty()
  picture: File;
}
