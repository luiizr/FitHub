import { Injectable } from '@angular/core';
import axios, { AxiosInstance, AxiosError } from 'axios';
import { ProvedorHttpClient } from '@fit-hub/adapters';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AxiosHttpClient implements ProvedorHttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: environment.apiUrl,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 segundos
    });

    // Interceptor para adicionar token automaticamente
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Interceptor para tratar erros de resposta
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          // Redirecionar para login se necessário
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Métodos HTTP sem logs de dados sensíveis
  async post<T>(url: string, data: unknown): Promise<T> {
    const response = await this.client.post(url, data);
    return response.data;
  }

  async get<T>(url: string): Promise<T> {
    const response = await this.client.get(url);
    return response.data;
  }

  async put<T>(url: string, data: unknown): Promise<T> {
    const response = await this.client.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete(url);
    return response.data;
  }
}