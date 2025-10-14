import { CasoDeUso } from "@fit-hub/utils";
import RepositorioUsuario from "../provider/RepositorioUsuario";
import Usuario from "../model/Usuario";

export type usuarioArgs = {
    email: string;
    senha: string;
}

export default class LoginUsuario implements CasoDeUso<usuarioArgs, Usuario> {
    
    constructor(
        private readonly repo: RepositorioUsuario,
    ) {}
    
    async executar(entrada: usuarioArgs): Promise<Usuario> {
        const verificarSeUsuarioExiste = await this.repo.BuscarUsuarioPorEmail(entrada.email) // Verifica pela segunda vez se o usuário existe
            if (!verificarSeUsuarioExiste) {
                throw new Error("Usuário não encontrado")
            }

        return {
            ...verificarSeUsuarioExiste, senha: undefined
        }
    }
}