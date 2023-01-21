import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    password: string;
}
