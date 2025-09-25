import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';

export class ApagarUsuario {
    constructor(private readonly usuarioRepository: IUsuarioRepository) {}

    async executar(id: string): Promise<void> {
        const usuario = await this.usuarioRepository.buscarPorId(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        await this.usuarioRepository.remover(id);
    }
}