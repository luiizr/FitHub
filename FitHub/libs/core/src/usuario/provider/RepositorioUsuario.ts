import Usuario from '../model/Usuario';


export default interface RepositorioUsuario {
    RegistrarUsuario(usuario: Usuario): Promise<void>
    CalcularKcal(usuario: Usuario): Promise<Usuario>
    BuscarUsuarioPorEmail(email: string): Promise<Usuario | null>
    BuscarUsuarioPorId(id: string): Promise<Usuario | null>
}