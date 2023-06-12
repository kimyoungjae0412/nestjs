import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    return this.authService.createUser(authCredentialsDto);
  }

  @Post('/login')
  loginUser(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<Object> {
    return this.authService.loginUser(authCredentialsDto);
  }
}
