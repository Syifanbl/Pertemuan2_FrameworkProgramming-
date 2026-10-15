
import {
    IsNotEmpty,
    IsString,
    IsEmail,
    MinLength,
    MaxLength
} from 'class-validator';

export class RegisterDto {
    @IsNotEmpty({ message: 'Username harus diisi' })
    @IsString({ message: 'Username harus berupa teks' })
    @MinLength(30, { message: 'Username minimal 30 karakter' })
    readonly username: string;

    @IsNotEmpty({ message: 'Email harus diisi' })
    @IsEmail({}, { message: 'Format email harus sesuai' })
    readonly email: string;

    @IsNotEmpty({ message: 'Password harus diisi' })
    @IsString({ message: 'Password harus berupa teks' })
    @MinLength(3, { message: 'Password minimal 3 karakter' })
    @MaxLength(16, { message: 'Password maksimal 16 karakter' })
    readonly password: string;

    @IsNotEmpty({ message: 'Confirm password harus diisi' })
    @IsString({ message: 'Confirm password harus berupa teks' })
    @MinLength(3, { message: 'Confirm password minimal 3 karakter' })
    @MaxLength(16, { message: 'Confirm password maksimal 16 karakter' })
    readonly confirmPassword: string;
}
