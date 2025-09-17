import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { UserRepository, User } from '@fithub/domain';

interface UserResponse {
  id: string;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpUserRepository implements UserRepository {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api'; // URL do backend

  async create(user: User): Promise<User> {
    const response = await firstValueFrom(
      this.http.post<UserResponse>(`${this.baseUrl}/users`, {
        email: user.email,
        username: user.username,
        password: user.password
      })
    );
    
    return new User(
      response.id,
      response.email,
      response.username,
      '', // não retornamos a senha do backend
      new Date(response.createdAt),
      new Date(response.updatedAt)
    );
  }

  async findById(id: string): Promise<User | null> {
    try {
      const response = await firstValueFrom(
        this.http.get<UserResponse>(`${this.baseUrl}/users/${id}`)
      );
      
      return new User(
        response.id,
        response.email,
        response.username,
        '',
        new Date(response.createdAt),
        new Date(response.updatedAt)
      );
    } catch {
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const response = await firstValueFrom(
        this.http.get<UserResponse>(`${this.baseUrl}/users/by-email/${email}`)
      );
      
      return new User(
        response.id,
        response.email,
        response.username,
        '',
        new Date(response.createdAt),
        new Date(response.updatedAt)
      );
    } catch {
      return null;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    try {
      const response = await firstValueFrom(
        this.http.get<UserResponse>(`${this.baseUrl}/users/by-username/${username}`)
      );
      
      return new User(
        response.id,
        response.email,
        response.username,
        '',
        new Date(response.createdAt),
        new Date(response.updatedAt)
      );
    } catch {
      return null;
    }
  }

  async update(user: User): Promise<User> {
    const response = await firstValueFrom(
      this.http.put<UserResponse>(`${this.baseUrl}/users/${user.id}`, {
        email: user.email,
        username: user.username
      })
    );
    
    return new User(
      response.id,
      response.email,
      response.username,
      '',
      new Date(response.createdAt),
      new Date(response.updatedAt)
    );
  }

  async delete(id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${this.baseUrl}/users/${id}`)
    );
  }
}