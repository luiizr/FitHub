import { Usuario } from '../entities/Usuario';

export interface IUsuarioRepository {
    buscarPorId(id: string): Promise<Usuario | null>;
    buscarPorEmail(email: string): Promise<Usuario | null>;
    buscarPorNome(nome: string): Promise<Usuario[]>;
    salvar(usuario: Usuario): Promise<void>;
    atualizar(usuario: Usuario): Promise<void>;
    remover(id: string): Promise<void>;
    existePorEmail(email: string): Promise<boolean>;
    listarTodos(limite?: number, offset?: number): Promise<Usuario[]>;
    contarTodos(): Promise<number>;
}