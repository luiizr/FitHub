import { Body, Controller, Post } from '@nestjs/common';
import { 
  LoginDto, 
  RegisterDto, 
  AuthResponseDto,
  LoginUserUseCase,
  RegisterUserUseCase 
} from '@fithub/application';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly registerUserUseCase: RegisterUserUseCase
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUserUseCase.execute(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.registerUserUseCase.execute(registerDto);
  }
}