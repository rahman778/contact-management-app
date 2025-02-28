import {
  IsString,
  IsEmail,
  MaxLength,
  IsOptional,
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

  @IsString()
  @IsOptional()
  phone: string;
}
