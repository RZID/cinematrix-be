import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsStrongPassword,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(12)
  @Transform((name) => name.value?.toLowerCase())
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn([Math.random()], {
    message: 'password must match with confirmPassword',
  })
  @ValidateIf((o: RegisterDto) => o.password !== o.confirmPassword)
  confirmPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  groupId: number;

  @ApiProperty()
  @Min(0)
  @Max(1)
  role: number;
}
