import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { 
  UpdateUserUseCase,
  ChangePasswordUseCase
} from '@fithub/application';
import { 
  PostgresUserRepository,
  BcryptHashService
} from '@fithub/infrastructure';
import pool from './database';

// Importar o service específico para NestJS
import { UserServiceNestJS } from '@fithub/application';

@Module({
  controllers: [UserController],
  providers: [
    // Service
    UserServiceNestJS,
    
    // Use Cases
    UpdateUserUseCase,
    ChangePasswordUseCase,
    
    // Repository
    {
      provide: 'UserRepository',
      useValue: new PostgresUserRepository(pool)
    },
    
    // Services
    {
      provide: 'HashService',
      useClass: BcryptHashService
    }
  ],
  exports: [UserServiceNestJS] // Exporta para outros módulos
})
export class UserModule {}