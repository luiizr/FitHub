import usuario from 'libs/core/src/usuarios/entidade/usuario';
import RepositorioUsuario from '../../../../core/src/usuarios/provider/RepositorioUsuario';


export default class UsuarioFacade implements RepositorioUsuario {
    private static readonly items: usuario[] = []
    
    
    async BuscarUsuarioPorId(Id: string): Promise<usuario | null> {
        const usuario = UsuarioFacade.items.find(u => u.id === Id)
        return usuario || null
    }

    async BuscarUsuarioPorNome(nome: string): Promise<usuario | null> {
        const usuario = UsuarioFacade.items.find(u => u.nome === nome)
        return usuario || null
    }

    async BuscarUsuarioPorEmail(email: string): Promise<usuario | null> {
        const usuario = UsuarioFacade.items.find(u => u.email === email)
        return usuario || null
    }

    async SalvarUsuario(usuario: usuario): Promise<void> {
        const usuarioExistente = await this.BuscarUsuarioPorEmail(usuario.email)
        if (usuarioExistente) {
            throw new Error(`Usuário com o email ${usuario.email} já existe!`)
        }
        UsuarioFacade.items.push(usuario)
    }

    async ApagarUsuario(usuario: usuario): Promise<void> {
        const index = UsuarioFacade.items.findIndex(u => u.id === usuario.id)
        if (index !== -1) {
            UsuarioFacade.items.splice(index, 1)
        }
    }

}