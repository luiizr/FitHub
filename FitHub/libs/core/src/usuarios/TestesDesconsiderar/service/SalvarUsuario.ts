import CasoDeUso from '../../../../utils/src/shareds/CasoDeUso';
import usuario from '../entidade/usuario';
import RepositorioUsuario from '../provider/RepositorioUsuario';
import Erros from 'libs/utils/src/shareds/Erros'
import Id from '../../../../utils/src/shareds/Id';
import { Nome } from '../../../../utils/src/shareds/Nome';
import ProvedoremailValidator from '../provider/ProvedoremailValidator';
import ProvedorsenhaHash from '../provider/ProvedorsenhaHash';


export default class SalvarUsuario implements CasoDeUso<usuario, void>{
    constructor(
        private repoUsuario: RepositorioUsuario,
        private provedorEmail: ProvedoremailValidator,
        private provedorSenhaHash: ProvedorsenhaHash,
    ){}    
    
    
    async executar(usuario: usuario): Promise<void> {

        const senhaComHash = this.provedorSenhaHash.criptografar(usuario.senha)
        const emailValidator = this.provedorEmail.validar(usuario.email)
        
        const usuarioExiste = await this.repoUsuario.BuscarUsuarioPorEmail(usuario.email)
        if (usuarioExiste) {
            throw new Error(Erros.USUARIO_JA_EXISTE)
        }

        const novoUsuario: usuario = {
            id: Id.gerarIdHash(),
            nome: Nome.padronizar(usuario.nome),
            email: emailValidator,
            senha: senhaComHash,
            peso: usuario.peso,
            altura: usuario.altura,
            idade: usuario.idade,
        }

        await this.repoUsuario.SalvarUsuario({...novoUsuario, senha: senhaComHash, email: emailValidator})
        console.info(`${JSON.stringify(novoUsuario)}`)
    }

}