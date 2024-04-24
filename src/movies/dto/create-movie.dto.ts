import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class MovieMediaDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  fileUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(MediaType)
  type: MediaType;

  @ApiProperty()
  @IsBoolean()
  isBanner: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  altName: string;
}

export class CreateMovieDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(191)
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: '2022-09-27 18:00:00.000',
  })
  @IsDateString()
  @IsNotEmpty()
  releaseDate: string;

  @ApiProperty({ type: () => MovieMediaDto })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => MovieMediaDto)
  media: MovieMediaDto[];
}
