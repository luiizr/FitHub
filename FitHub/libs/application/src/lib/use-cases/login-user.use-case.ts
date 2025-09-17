import { UserRepository } from '@fithub/domain';
import { LoginDto, AuthResponseDto } from '../dtos/auth.dto';
import { HashService, JwtService } from '../ports/auth.ports';

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}

  async execute(loginDto: LoginDto): Promise<AuthResponseDto> {
    // Buscar usuário por email
    const user = await this.userRepository.findByEmail(loginDto.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verificar senha
    const isPasswordValid = await this.hashService.compare(loginDto.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Gerar token JWT
    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      username: user.username
    });

    return {
      user: user.toJSON(),
      accessToken
    };
  }
}