import { IsNotEmpty, IsString, IsEmail, MaxLength, MinLength, IsOptional } from 'class-validator';
import { PasswordMatcher } from './password-matcher.decorator';

export class CreateUserDto {
    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsEmail()
    @MaxLength(250)
    @IsString()
    @IsNotEmpty()
    email: string;

    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    password: string;

    @PasswordMatcher('password', { message: 'Passwords are not same!' })
    @MinLength(6)
    @IsString()
    @IsNotEmpty()
    passwordConfirm: string;
}
