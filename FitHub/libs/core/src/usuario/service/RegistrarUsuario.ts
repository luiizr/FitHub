import Usuario from '../model/Usuario';
import RepositorioUsuario from '../provider/RepositorioUsuario';
import { CasoDeUso } from '@fit-hub/utils';


export default class RegistrarUsuario implements CasoDeUso<Usuario, void> {
    constructor(
        private repoUsuario: RepositorioUsuario,
    ) {}
    
    // Aqui, a gente recebe o usuário, e passamos as portas que iremos precisar nesse cdu
    async executar(usuario: Usuario): Promise<void> {
        console.info(`Registrando usuário: ${JSON.stringify(usuario)}`);
        if (!usuario.senha) {
            console.info("Senha do usuário está indefinida");
            throw new Error("Senha do usuário não pode ser indefinida")
        }
    
    const verificarSeUsuarioExiste = await this.repoUsuario.BuscarUsuarioPorEmail(usuario.email)
        if (verificarSeUsuarioExiste) {
            console.info("Usuário já existe com esse email:", usuario.email);
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
    console.info(`Novo usuário a ser registrado: ${JSON.stringify(novoUsuario)}`);
    await this.repoUsuario.RegistrarUsuario(novoUsuario)

        console.info(`${JSON.stringify(novoUsuario)}`)
    }
}