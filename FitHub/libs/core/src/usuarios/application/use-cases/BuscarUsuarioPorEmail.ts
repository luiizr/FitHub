import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';
import { Usuario } from '../../domain/entities/Usuario';

export interface BuscarUsuarioPorEmailOutput {
    id: string;
    nome: string;
    email: string;
    peso: number;
    altura: number;
    idade: number;
    imc: number;
    categoriaImc: string;
}

export class BuscarUsuarioPorEmail {
    constructor(private readonly usuarioRepository: IUsuarioRepository) {}

    async executar(email: string): Promise<BuscarUsuarioPorEmailOutput | null> {
        const usuario = await this.usuarioRepository.buscarPorEmail(email);
        if (!usuario) {
            return null;
        }

        return this.mapear(usuario);
    }

    private mapear(usuario: Usuario): BuscarUsuarioPorEmailOutput {
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            peso: usuario.peso,
            altura: usuario.altura,
            idade: usuario.idade,
            imc: usuario.calcularIMC(),
            categoriaImc: usuario.obterCategoriaIMC(),
        };
    }
}