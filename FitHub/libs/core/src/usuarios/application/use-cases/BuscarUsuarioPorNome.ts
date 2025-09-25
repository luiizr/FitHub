import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';
import { Usuario } from '../../domain/entities/Usuario';

export interface BuscarUsuarioPorNomeOutput {
    id: string;
    nome: string;
    email: string;
    peso: number;
    altura: number;
    idade: number;
    imc: number;
}

export class BuscarUsuarioPorNome {
    constructor(private readonly usuarioRepository: IUsuarioRepository) {}

    async executar(nome: string): Promise<BuscarUsuarioPorNomeOutput[]> {
        const usuarios = await this.usuarioRepository.buscarPorNome(nome);
        return usuarios.map((usuario) => this.mapear(usuario));
    }

    private mapear(usuario: Usuario): BuscarUsuarioPorNomeOutput {
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            peso: usuario.peso,
            altura: usuario.altura,
            idade: usuario.idade,
            imc: usuario.calcularIMC(),
        };
    }
}