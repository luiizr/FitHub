import { Usuario } from '../domain/entities/Usuario';
import RepositorioUsuario from '../provider/RepositorioUsuario';

export class BuscarUsuarioPorEmail {
    constructor(
        private readonly repoUsuario: RepositorioUsuario,
    ) {}

    async execute(email: string): Promise<Usuario | null> {
        return this.repoUsuario.BuscarUsuarioPorEmail(email);
    }
}