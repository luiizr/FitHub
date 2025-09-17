import { UserRepository, User } from '@fithub/domain';
import { UpdateUserDto, ChangePasswordDto } from '../dtos/user.dto';
import { HashService } from '../ports/auth.ports';

export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService
  ) {}

  async execute(userId: string, updateDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verificar se email já está em uso por outro usuário
    if (updateDto.email && updateDto.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(updateDto.email);
      if (existingUser && existingUser.id !== userId) {
        throw new Error('Email already in use');
      }
    }

    // Verificar se username já está em uso por outro usuário
    if (updateDto.username && updateDto.username !== user.username) {
      const existingUser = await this.userRepository.findByUsername(updateDto.username);
      if (existingUser && existingUser.id !== userId) {
        throw new Error('Username already in use');
      }
    }

    // Criar usuário atualizado
    const updatedUser = new User(
      user.id,
      updateDto.email || user.email,
      updateDto.username || user.username,
      user.password,
      user.createdAt,
      new Date()
    );

    return this.userRepository.update(updatedUser);
  }
}

export class ChangePasswordUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService
  ) {}

  async execute(userId: string, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await this.hashService.compare(
      changePasswordDto.currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash da nova senha
    const hashedNewPassword = await this.hashService.hash(changePasswordDto.newPassword);

    // Atualizar senha
    user.updatePassword(hashedNewPassword);
    await this.userRepository.update(user);
  }
}