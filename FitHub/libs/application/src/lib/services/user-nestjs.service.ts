import { Injectable, Inject } from '@nestjs/common';
import { UserRepository, User } from '@fithub/domain';

@Injectable()
export class UserServiceNestJS {
  constructor(@Inject('UserRepository') private readonly userRepository: UserRepository) {}

  async createUser(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  async getUserByUsername(username: string): Promise<User | null> {
    return this.userRepository.findByUsername(username);
  }

  async updateUser(user: User): Promise<User> {
    return this.userRepository.update(user);
  }

  async deleteUser(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  async getAllUsers(): Promise<User[]> {
    // Implementação futura - poderia adicionar paginação
    throw new Error('Method not implemented yet');
  }

  async getUserProfile(id: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    // Retorna o usuário sem a senha para uso em perfis
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      toJSON: user.toJSON.bind(user),
      updatePassword: user.updatePassword.bind(user)
    };
  }
}