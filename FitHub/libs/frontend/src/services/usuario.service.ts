import { Injectable } from '@angular/core';
import { AxiosHttpClient } from '../httpClient/RepositorioAxiosInstance';
import { Usuario } from '@fit-hub/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: AxiosHttpClient) {}

  async registrarUsuario(usuarioDto: Usuario): Promise<void> {
    // Não loga dados sensíveis (senha, dados pessoais)
    
    // Mapear DTO para entidade de domínio
    const usuario: Usuario = {
      nome: usuarioDto.nome,
      email: usuarioDto.email,
      senha: usuarioDto.senha,
      peso: usuarioDto.peso ?? 0,
      altura: usuarioDto.altura ?? 0,
      idade: usuarioDto.idade ?? 18,
    };
    return this.http.post<void>('/api/registrar', usuario);
  }

  async loginUsuario(email: string, senha: string): Promise<string> {
    // Não loga credenciais ou tokens
    const response = await this.http.post<{ token: string }>('/api/login', { email, senha });
    return response.token;
  }

  async buscarUsuarioPorId(): Promise<Usuario | null> {
    const usuario = await this.http.get<Usuario>(`/api/usuario`);
    if (!usuario) return null;

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      peso: usuario.peso,
      altura: usuario.altura,
      idade: usuario.idade,
    };
  }

  // async buscarTodosUsuarios(): Promise<UsuarioDTO[]> {
  //   const usuarios = await this.httpUsuarioRepository.buscarTodosUsuarios();
  //   return usuarios.map((u) => ({
  //     id: u.id,
  //     nome: u.nome,
  //     email: u.email,
  //     peso: u.peso,
  //     altura: u.altura,
  //     idade: u.idade,
  //   }));
  // }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}