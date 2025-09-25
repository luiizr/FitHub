import usuario from "../entidade/usuario"

export default interface RepositorioUsuario {
    BuscarUsuarioPorId(Id: string): Promise<usuario | null>
    BuscarUsuarioPorNome(nome: string): Promise<usuario | null>
    BuscarUsuarioPorEmail(email: string): Promise<usuario | null>
    SalvarUsuario(usuario: usuario): Promise<void>
    ApagarUsuario(usuario: usuario): Promise<void>
}