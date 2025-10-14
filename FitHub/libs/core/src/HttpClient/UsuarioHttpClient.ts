import { Observable } from 'rxjs';

export interface UsuarioHttpClient {
  registrarUsuario(dados: RegistrarUsuarioRequest): Observable<RegistrarUsuarioResponse>;
  loginUsuario(dados: LoginRequest): Observable<LoginResponse>;
  buscarUsuarioPorId(id: string): Observable<UsuarioResponse>;
  buscarTodos(): Observable<UsuarioResponse[]>;
  deletarUsuario(id: string): Observable<void>;
}

// Request/Response Types
export interface RegistrarUsuarioRequest {
  nome: string;
  email: string;
  senha: string;
  peso: number;
  altura: number;
  idade: number;
  FA?: string;
}

export interface RegistrarUsuarioResponse {
  message: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: UsuarioResponse;
}

export interface UsuarioResponse {
  id: string;
  nome: string;
  email: string;
  peso: number;
  altura: number;
  idade: number;
}