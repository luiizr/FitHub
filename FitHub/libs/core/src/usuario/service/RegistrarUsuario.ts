import ProvedorCriptografia from '../../../../adapters/src/providers/hashSenha/ProvedorCriptografia';
import CasoDeUso from '../../../../utils/src/shareds/CasoDeUso';
import Id from '../../../../utils/src/shareds/Id';
import Usuario from '../model/Usuario';
import RepositorioUsuario from '../provider/RepositorioUsuario';


export default class RegistrarUsuario implements CasoDeUso<Usuario, void> {
    constructor(
        private repoUsuario: RepositorioUsuario,
        private provedorCripto: ProvedorCriptografia
    ) {}
    
    // Aqui, a gente recebe o usuário, e passamos as portas que iremos precisar nesse cdu
    async executar(usuario: Usuario): Promise<void> {

        if (!usuario.senha) {
            throw new Error("Senha do usuário não pode ser indefinida")
        }
    
    const verificarSeUsuarioExiste = await this.repoUsuario.BuscarUsuarioPorEmail(usuario.email)
        if (verificarSeUsuarioExiste) {
            throw new Error("Esse usuário ja existe")
        }
    
    const senhaCripto = this.provedorCripto.criptografar(usuario.senha)
    
    const novoUsuario: Usuario = {
        id: Id.gerarIdHash(),
        senha: senhaCripto,
        altura: usuario.altura,
        email: usuario.email,
        idade: usuario.idade,
        nome: usuario.nome,
        peso: usuario.peso,
    }
    await this.repoUsuario.RegistrarUsuario({...novoUsuario, senha: senhaCripto})
        console.info(`${JSON.stringify(novoUsuario)}`)
    }
}