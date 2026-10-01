import { Body, Controller, Patch, Post } from '@nestjs/common';
import { RegisterDto } from '../books/dto/register.dto.js';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    login() {
        return this.authService.login();
    }

    @Post('forgot-password')
    forgotPassword(){
        return this.authService.forgotPassword();
    }

    @Patch('reset-password')
    resetPassword(){
        return this.authService.resetPassword();
    }
}
