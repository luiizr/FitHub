import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { 
  LoginUserUseCase, 
  RegisterUserUseCase,
  HashService,
  JwtService as IJwtService
} from '@fithub/application';
import { UserRepository } from '@fithub/domain';
import { 
  PostgresUserRepository,
  BcryptHashService,
  JsonWebTokenService 
} from '@fithub/infrastructure';
import pool from './database';

@Module({
  controllers: [AuthController],
  providers: [
    // Use Cases
    LoginUserUseCase,
    RegisterUserUseCase,
    
    // Repository
    {
      provide: 'UserRepository',
      useValue: new PostgresUserRepository(pool)
    },
    
    // Services
    {
      provide: 'HashService',
      useClass: BcryptHashService
    },
    {
      provide: 'JwtService',
      useClass: JsonWebTokenService
    }
  ]
})
export class AuthModule {}