import ProvedorCriptografia from "libs/adapters/src/providers/hashSenha/ProvedorCriptografia";
import CasoDeUso from "libs/utils/src/shareds/CasoDeUso";
import RepositorioUsuario from "../provider/RepositorioUsuario";
import Usuario from "../model/Usuario";

export type usuarioArgs = {
    email: string;
    senha: string;
}

export default class LoginUsuario implements CasoDeUso<usuarioArgs, Usuario> {
    
    constructor(
        private readonly repo: RepositorioUsuario,
        private provedorCripto: ProvedorCriptografia
    ) {}
    
    async executar(entrada: usuarioArgs): Promise<Usuario> {
        const verificarSeUsuarioExiste = await this.repo.BuscarUsuarioPorEmail(entrada.email)
            if (!verificarSeUsuarioExiste) {
                throw new Error("Usuário não encontrado")
            }
        
        const validarSenha = this.provedorCripto.comparar(entrada.senha, verificarSeUsuarioExiste.senha!)
        if (!validarSenha) {
            throw new Error("Senha inválida")
        }
        return {
            ...verificarSeUsuarioExiste, senha: undefined
        }
    }
}