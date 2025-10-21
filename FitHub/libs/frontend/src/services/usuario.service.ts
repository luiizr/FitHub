import { Injectable } from '@angular/core';
import { AxiosHttpClient } from '@fit-hub/backendAdapters';
import { Usuario } from '@fit-hub/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(private http: AxiosHttpClient) {}

  async registrarUsuario(usuarioDto: Usuario): Promise<void> {
    console.info('Registrando usuário via API:', usuarioDto);
    
    // Mapear DTO para entidade de domínio
    const usuario: Usuario = {
      nome: usuarioDto.nome,
      email: usuarioDto.email,
      senha: usuarioDto.senha,
      peso: usuarioDto.peso ?? 0,
      altura: usuarioDto.altura ?? 0,
      idade: usuarioDto.idade ?? 18,
    };

    console.info('usuario montado, pronto para registrar', usuario)

    return this.http.post<void>('/usuarios/registrar', usuario);
  }

  async loginUsuario(email: string, senha: string): Promise<string> {
    console.info('Fazendo login via API:', email);
    const response = await this.http.post<{ token: string }>('/usuarios/login', { email, senha });
    return response.token;
  }

  async buscarUsuarioPorId(id: string): Promise<Usuario | null> {
    const usuario = await this.http.get<Usuario>(`/usuarios/${id}`);
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