import { CasoDeUso } from "@fit-hub/utils";
import RepositorioPostagem from "../provider/RepositorioPostagem";
import Postagem from "../model/postagem";

export default class ListarPostagens implements CasoDeUso<void, Postagem[]> {
    constructor (
        readonly repoPostagem: RepositorioPostagem
    ) {}

    async executar(): Promise<Postagem[]> {
        const postagens = await this.repoPostagem.ListarPostagens();
        if (!postagens) {
            throw new Error("Nenhuma postagem encontrada");
        }
        return postagens;
    }
}
