import Postagem from "../model/postagem";

export default interface RepositorioPostagem {
    SalvarPostagem(postagem: Postagem): Promise<void>
    BuscarPostagemPorId(id: string): Promise<Postagem | null>
    DeletarPostagem(id: string): Promise<void>
    BuscarPostagensPorUsuarioId(usuarioId: Postagem["user_id"]): Promise<Postagem[]>
    ListarPostagens(): Promise<Postagem[]>
}