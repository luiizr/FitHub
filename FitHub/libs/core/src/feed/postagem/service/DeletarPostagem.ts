import { CasoDeUso } from "@fit-hub/utils";
import RepositorioPostagem from "../provider/RepositorioPostagem";

interface DeletarPostagemArgs {
    id: string;
    userId: string;
}

export default class DeletarPostagem implements CasoDeUso<DeletarPostagemArgs, void> {
    constructor (
        readonly repoPostagem: RepositorioPostagem
    ) {}

    async executar(dados: DeletarPostagemArgs): Promise<void> {
        const validarPostagem = await this.repoPostagem.BuscarPostagemPorId(dados.id);
        if (!validarPostagem) {
            throw new Error("Postagem não encontrada para exclusão");
        }
        // Valida o usuário para saber se ele é o dono da postagem, caso contrário, ele não pode deletar a postagem
        if (validarPostagem.userId == dados.userId) {
            await this.repoPostagem.DeletarPostagem(dados.id);
        } else {
            throw new Error("Usuário não autorizado a deletar esta postagem");
        }
    }
}