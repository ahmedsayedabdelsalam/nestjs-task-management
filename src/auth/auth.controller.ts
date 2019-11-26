import { Controller, Post, Body, ValidationPipe, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('signin')
    signIn(@Body(ValidationPipe) AuthCredentialsDto: AuthCredentialsDto): Promise<{ accesstoken: string }> {
        return this.authService.signIn(AuthCredentialsDto)
    }

    @UseGuards(AuthGuard())
    @Get('profile')
    getProfile(@GetUser() user: User) {
        return user;
    }
}
