import Postagem from "../model/postagem";

export default interface RepositorioPostagem {
    SalvarPostagem(postagem: Postagem): Promise<void>
    BuscarPostagemPorId(id: string): Promise<Postagem | null>
    DeletarPostagem(id: string): Promise<void>
    BuscarPostagensPorUsuarioId(usuarioId: Postagem["userId"]): Promise<Postagem[]>
    ListarPostagens(): Promise<Postagem[]>
}