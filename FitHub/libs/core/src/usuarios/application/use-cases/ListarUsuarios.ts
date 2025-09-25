import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';
import { Usuario } from '../../domain/entities/Usuario';

export interface ListarUsuariosInput {
    limite?: number;
    offset?: number;
}

export interface ListarUsuariosOutput {
    total: number;
    itens: UsuarioResumido[];
}

export interface UsuarioResumido {
    id: string;
    nome: string;
    email: string;
    imc: number;
    categoriaImc: string;
}

export class ListarUsuarios {
    private static readonly LIMITE_PADRAO = 20;

    constructor(private readonly usuarioRepository: IUsuarioRepository) {}

    async executar(input: ListarUsuariosInput = {}): Promise<ListarUsuariosOutput> {
        const limite = input.limite ?? ListarUsuarios.LIMITE_PADRAO;
        const offset = input.offset ?? 0;

        const [usuarios, total] = await Promise.all([
            this.usuarioRepository.listarTodos(limite, offset),
            this.usuarioRepository.contarTodos(),
        ]);

        return {
            total,
            itens: usuarios.map((usuario) => this.mapear(usuario)),
        };
    }

    private mapear(usuario: Usuario): UsuarioResumido {
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            imc: usuario.calcularIMC(),
            categoriaImc: usuario.obterCategoriaIMC(),
        };
    }
}