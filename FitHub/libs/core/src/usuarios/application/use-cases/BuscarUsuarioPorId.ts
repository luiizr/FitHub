import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';
import { Usuario } from '../../domain/entities/Usuario';

export interface BuscarUsuarioPorIdOutput {
    id: string;
    nome: string;
    email: string;
    peso: number;
    altura: number;
    idade: number;
    imc: number;
    categoriaImc: string;
    criadoEm: Date;
}

export class BuscarUsuarioPorId {
    constructor(private readonly usuarioRepository: IUsuarioRepository) {}

    async executar(id: string): Promise<BuscarUsuarioPorIdOutput | null> {
        const usuario = await this.usuarioRepository.buscarPorId(id);
        if (!usuario) {
            return null;
        }

        return this.mapear(usuario);
    }

    private mapear(usuario: Usuario): BuscarUsuarioPorIdOutput {
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            peso: usuario.peso,
            altura: usuario.altura,
            idade: usuario.idade,
            imc: usuario.calcularIMC(),
            categoriaImc: usuario.obterCategoriaIMC(),
            criadoEm: usuario.criadoEm,
        };
    }
}