import { CasoDeUso } from "@fit-hub/utils";
import Postagem from "../model/postagem";
import RepositorioPostagem from "../provider/RepositorioPostagem";

export default class SalvarPostagem implements CasoDeUso<Postagem, void> {
    constructor (
        readonly repoPostagem: RepositorioPostagem
    ) {}
    
    async executar(dados: Postagem): Promise<void> {
        // Verificar se todos os dados estão condizentes
        if (dados.id) {
            console.log('Postagem seguindo para edição', dados.id)
                const PostagemExistente = await this.repoPostagem.BuscarPostagemPorId(dados.id)
                    if (!PostagemExistente) {
                        throw new Error("Postagem não encontrada para atualização");
                    }
            // Atualizar a postagem existente
            const PostagemAtualizada: Postagem = {
                ...PostagemExistente,
                user_id: dados.user_id,
                ...(dados.conteudo_escrito && { conteudo_escrito: dados.conteudo_escrito }),
                ...(dados.conteudo_midia && { conteudo_midia: dados.conteudo_midia }),
                data_alteracao: new Date(),
            }
            if (dados.conteudo_midia !== undefined) {
                PostagemAtualizada.conteudo_midia = dados.conteudo_midia;
            }
            await this.repoPostagem.SalvarPostagem(PostagemAtualizada)
            return;
        }
        // extrair os dados para criar a postagem
        const Postagem: Postagem = {
            user_id: dados.user_id,
            conteudo_escrito: dados.conteudo_escrito,
        }

        if (dados.conteudo_midia) Postagem.conteudo_midia = dados.conteudo_midia;
        // Não inclui dataCriacao - banco gera automaticamente
        // Não inclui ID - banco gera automaticamente

        // Criar a postagem no repositório, nesse caso, no colecaoPostagem
        await this.repoPostagem.SalvarPostagem(Postagem)
    }
}