import { IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';
import { Role } from 'src/enums/roles.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumber()
  created_time: string;

  @IsString()
  role: Role;
}
