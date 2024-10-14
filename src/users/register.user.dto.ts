import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  role: string;
}

