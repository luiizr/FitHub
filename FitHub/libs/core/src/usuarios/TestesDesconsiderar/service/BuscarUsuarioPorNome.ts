import  Usuario  from '../entidade/Usuario';
import RepositorioUsuario from '../provider/RepositorioUsuario';

export class BuscarUsuarioPorNome {
    constructor(
        private readonly repoUsuario: RepositorioUsuario,
    ) {}

    async execute(nome: string): Promise<Usuario | null> {
        return this.repoUsuario.BuscarUsuarioPorNome(nome);
    }
}