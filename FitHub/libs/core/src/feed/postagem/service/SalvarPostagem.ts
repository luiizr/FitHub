import { CasoDeUso } from "@fit-hub/utils";
import Postagem from "../model/postagem";
import RepositorioPostagem from "../provider/RepositorioPostagem";

export default class CriarPostagem implements CasoDeUso<Postagem, void> {
    constructor (
        readonly repoPostagem: RepositorioPostagem
    ) {}
    
    async executar(dados: Postagem): Promise<void> {
        console.info('Executando SalvarPostagem com dados:', dados);
        // Verificar se todos os dados estão condizentes
        if (dados.id) {
            console.info('Postagem tem id, vamos buscar a postagem');
                const PostagemExistente = await this.repoPostagem.BuscarPostagemPorId(dados.id)
                    if (!PostagemExistente) {
                        throw new Error("Postagem não encontrada para atualização");
                    }
            console.info('Postagem existente encontrada:', PostagemExistente);
            // Atualizar a postagem existente
            const PostagemAtualizada: Postagem = {
                ...PostagemExistente,
                userId: dados.userId,
                ...(dados.conteudoEscrito && { conteudoEscrito: dados.conteudoEscrito }),
                ...(dados.conteudoMidia && { conteudoMidia: dados.conteudoMidia }),
                dataAlteracao: new Date(),
            }
            console.info('Atualizando postagem com dados:', PostagemAtualizada);
            // ✅ Só atualiza conteudoMidia se vier preenchido
            if (dados.conteudoMidia !== undefined) {
                PostagemAtualizada.conteudoMidia = dados.conteudoMidia;
            }
            console.info('Postagem atualizada para salvar:', PostagemAtualizada);
            await this.repoPostagem.SalvarPostagem(PostagemAtualizada)
            return;
        }
        // extrair os dados para criar a postagem
        const Postagem: Postagem = {
            userId: dados.userId,
            conteudoEscrito: dados.conteudoEscrito,
        }
        
        // ✅ Campos opcionais - só adiciona se existirem
        if (dados.conteudoMidia) Postagem.conteudoMidia = dados.conteudoMidia;
        // ✅ Não inclui dataCriacao - banco gera automaticamente

        // Criar a postagem no repositório, nesse caso, no colecaoPostagem
        await this.repoPostagem.SalvarPostagem(Postagem)
    }
}