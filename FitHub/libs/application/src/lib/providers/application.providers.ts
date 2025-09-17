import { InjectionToken } from '@angular/core';
import { UserRepository } from '@fithub/domain';

// Token de injeção para o UserRepository
export const USER_REPOSITORY_TOKEN = new InjectionToken<UserRepository>('UserRepository');