import { Injectable } from '@angular/core';
import { HttpUsuarioRepository } from '@fit-hub/adapters';
import { UsuarioDTO } from '@fit-hub/adapters';
import Usuario from '@fit-hub/core/src/usuario/model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private httpUsuarioRepository: HttpUsuarioRepository) {}

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

    return this.httpUsuarioRepository.registrarUsuario(usuario);
  }

  async loginUsuario(email: string, senha: string): Promise<string> {
    console.info('Fazendo login via API:', email);
    return this.httpUsuarioRepository.loginUsuario(email, senha);
  }

  async buscarUsuarioPorId(id: string): Promise<UsuarioDTO | null> {
    const usuario = await this.httpUsuarioRepository.buscarUsuarioPorId(id);
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

  async buscarTodosUsuarios(): Promise<UsuarioDTO[]> {
    const usuarios = await this.httpUsuarioRepository.buscarTodosUsuarios();
    return usuarios.map((u) => ({
      id: u.id,
      nome: u.nome,
      email: u.email,
      peso: u.peso,
      altura: u.altura,
      idade: u.idade,
    }));
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}