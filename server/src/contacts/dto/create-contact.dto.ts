import {
  IsString,
  IsEmail,
  MaxLength,
  IsOptional,
  IsNotEmpty,
  Matches,
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
  @Matches(/^\+?(\d\s?){10,15}$/, {
    message: 'Please enter a valid phone number (10-15 digits).',
  })
  @IsOptional()
  phone: string;
}
