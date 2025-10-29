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
                userId: dados.userId,
                ...(dados.conteudoEscrito && { conteudoEscrito: dados.conteudoEscrito }),
                ...(dados.conteudoMidia && { conteudoMidia: dados.conteudoMidia }),
                dataAlteracao: new Date(),
            }
            if (dados.conteudoMidia !== undefined) {
                PostagemAtualizada.conteudoMidia = dados.conteudoMidia;
            }
            await this.repoPostagem.SalvarPostagem(PostagemAtualizada)
            return;
        }
        // extrair os dados para criar a postagem
        const Postagem: Postagem = {
            userId: dados.userId,
            conteudoEscrito: dados.conteudoEscrito,
        }
        
        if (dados.conteudoMidia) Postagem.conteudoMidia = dados.conteudoMidia;
        // Não inclui dataCriacao - banco gera automaticamente
        // Não inclui ID - banco gera automaticamente

        // Criar a postagem no repositório, nesse caso, no colecaoPostagem
        await this.repoPostagem.SalvarPostagem(Postagem)
    }
}