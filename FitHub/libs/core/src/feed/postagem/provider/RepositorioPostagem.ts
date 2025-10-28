import Postagem from "../model/postagem";

export default interface RepositorioPostagem {
    SalvarPostagem(postagem: Postagem): Promise<void>
    DeletarPostagem(id: string): Promise<void>
    BuscarPostagemPorId(id: string): Promise<Postagem | null>
    BuscarPostagensPorUsuarioId(usuarioId: Postagem["userId"]): Promise<Postagem[]>
}