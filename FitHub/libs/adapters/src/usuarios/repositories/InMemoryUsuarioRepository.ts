import { IUsuarioRepository, Usuario } from '@fit-hub/core';

export class InMemoryUsuarioRepository implements IUsuarioRepository {
    private readonly itens = new Map<string, Usuario>();

    async buscarPorId(id: string): Promise<Usuario | null> {
        return this.itens.get(id) ?? null;
    }

    async buscarPorEmail(email: string): Promise<Usuario | null> {
        for (const usuario of this.itens.values()) {
            if (usuario.email === email) {
                return usuario;
            }
        }
        return null;
    }

    async buscarPorNome(nome: string): Promise<Usuario[]> {
        const nomeNormalizado = nome.trim().toLowerCase();
        return Array.from(this.itens.values()).filter((usuario) =>
            usuario.nome.toLowerCase().includes(nomeNormalizado)
        );
    }

    async salvar(usuario: Usuario): Promise<void> {
        this.itens.set(usuario.id, usuario);
    }

    async atualizar(usuario: Usuario): Promise<void> {
        if (!this.itens.has(usuario.id)) {
            throw new Error('Usuário não encontrado para atualização');
        }
        this.itens.set(usuario.id, usuario);
    }

    async remover(id: string): Promise<void> {
        this.itens.delete(id);
    }

    async existePorEmail(email: string): Promise<boolean> {
        return (await this.buscarPorEmail(email)) !== null;
    }

    async listarTodos(limite = 20, offset = 0): Promise<Usuario[]> {
        const valores = Array.from(this.itens.values());
        return valores.slice(offset, offset + limite);
    }

    async contarTodos(): Promise<number> {
        return this.itens.size;
    }
}