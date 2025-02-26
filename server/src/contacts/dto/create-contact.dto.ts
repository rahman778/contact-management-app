import {
  IsString,
  IsEmail,
  MaxLength,
  IsOptional,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsEmail({}, { message: 'The email provided is not valid.' })
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber('CA')
  @IsOptional()
  phone: string;
}
