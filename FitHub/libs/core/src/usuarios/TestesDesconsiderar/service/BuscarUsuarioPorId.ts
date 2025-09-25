import { Usuario } from '../model/Usuario';
import RepositorioUsuario from '../provider/RepositorioUsuario';

export class BuscarUsuarioPorId {
    constructor(
        private readonly repoUsuario: RepositorioUsuario,
    ) {}

    async execute(id: string): Promise<Usuario | null> {
        return this.repoUsuario.BuscarUsuarioPorId(id);
    }
}