import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsDate,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClaimsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  sub: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty({ required: false })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  given_name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  family_name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  gender?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({ required: false })
  birthdate?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  picture?: string;
}
