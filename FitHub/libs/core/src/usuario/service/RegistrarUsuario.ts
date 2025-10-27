import Usuario from '../model/Usuario';
import RepositorioUsuario from '../provider/RepositorioUsuario';
import { CasoDeUso } from '@fit-hub/utils';


export default class RegistrarUsuario implements CasoDeUso<Usuario, void> {
    constructor(
        private repoUsuario: RepositorioUsuario,
    ) {}
    
    // Aqui, a gente recebe o usuário, e passamos as portas que iremos precisar nesse cdu
    async executar(usuario: Usuario): Promise<void> {
        // Validação sem expor senha em logs
        if (!usuario.senha) {
            throw new Error("Senha do usuário não pode ser indefinida")
        }
    
    const verificarSeUsuarioExiste = await this.repoUsuario.BuscarUsuarioPorEmail(usuario.email)
        if (verificarSeUsuarioExiste) {
            // Não loga email para evitar enumeração de usuários
            throw new Error("Esse usuário ja existe")
        }
        
    // Não gera ID aqui - deixa o banco gerar automaticamente
    const novoUsuario: Usuario = {
        // id será gerado pelo PostgreSQL automaticamente
        senha: usuario.senha,
        altura: usuario.altura,
        email: usuario.email,
        idade: usuario.idade,
        nome: usuario.nome,
        peso: usuario.peso,
    }
    // Não loga dados completos do usuário (contém senha)
    await this.repoUsuario.RegistrarUsuario(novoUsuario)
    }
}