import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @Transform((name) => name.value?.toLowerCase())
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
