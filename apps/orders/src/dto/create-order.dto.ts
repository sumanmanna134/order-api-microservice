import {
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrderRequestDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  price: number;

  @IsPhoneNumber()
  @IsNotEmpty()
  phoneNumber: string;
}
