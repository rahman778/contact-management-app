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

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
