import { UserRepository, User } from '@fithub/domain';
import { RegisterDto, AuthResponseDto } from '../dtos/auth.dto';
import { HashService, JwtService } from '../ports/auth.ports';

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
    private readonly jwtService: JwtService
  ) {}

  async execute(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Verificar se usuário já existe
    const existingUserByEmail = await this.userRepository.findByEmail(registerDto.email);
    if (existingUserByEmail) {
      throw new Error('Email already exists');
    }

    const existingUserByUsername = await this.userRepository.findByUsername(registerDto.username);
    if (existingUserByUsername) {
      throw new Error('Username already exists');
    }

    // Hash da senha
    const hashedPassword = await this.hashService.hash(registerDto.password);

    // Criar usuário
    const user = new User(
      this.generateId(),
      registerDto.email,
      registerDto.username,
      hashedPassword
    );

    // Salvar no banco
    const savedUser = await this.userRepository.create(user);

    // Gerar token JWT
    const accessToken = this.jwtService.sign({
      sub: savedUser.id,
      email: savedUser.email,
      username: savedUser.username
    });

    return {
      user: savedUser.toJSON(),
      accessToken
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}