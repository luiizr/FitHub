import { Injectable } from '@angular/core';
import { InMemoryUsuarioRepository } from '@fit-hub/adapters';
import { UsuarioDTO } from '../../../adapters/src/dto/UsuarioDTO';
import { Usuario } from 'libs/core/src/usuarios/domain/entities/Usuario';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  constructor(private readonly repoUsuario: InMemoryUsuarioRepository) {}

  async salvarUsuario(usuario: UsuarioDTO): Promise<void> {
    console.info('Salvando usuário DTO:', usuario);
    // Mapeia DTO para entidade de domínio e delega ao repositório
    const entidade = Usuario.criar(
      usuario.nome,
      usuario.email,
      usuario.senha ?? '',
      usuario.peso ?? 0,
      usuario.altura ?? 0,
      usuario.idade ?? 18
    );
    return this.repoUsuario.salvar(entidade);
  }

  async buscarUsuarioPorId(id: string): Promise<UsuarioDTO | null> {
    const found = await this.repoUsuario.buscarPorId(id);
    if (!found) return null;
    return {
      id: found.id,
      nome: found.nome,
      email: found.email,
      peso: found.peso,
      altura: found.altura,
      idade: found.idade,
    };
  }

  async buscarTodosUsuarios(): Promise<UsuarioDTO[]> {
    const list = await this.repoUsuario.listarTodos();
    return list.map((u) => ({
      id: u.id,
      nome: u.nome,
      email: u.email,
      peso: u.peso,
      altura: u.altura,
      idade: u.idade,
    }));
  }

  async deletarUsuario(id: string): Promise<void> {
    return this.repoUsuario.remover(id);
  }
}
