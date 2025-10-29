import { Postagem } from '@fit-hub/core';
import { RepositorioPostagem } from '@fit-hub/core';
import ProvedorDados from '../providers/ProvedorDados';

export default class ColecaoPostagem implements RepositorioPostagem {
    constructor(private provedor: ProvedorDados) {}
    ListarPostagens(): Promise<Postagem[]> {
        return this.provedor.buscarTodos<Postagem>('postagens');
    }

    async SalvarPostagem(postagem: Postagem): Promise<void> {
        // ✅ Monta objeto apenas com campos obrigatórios
        const dadosPostagem: Record<string, unknown> = {
            conteudo_escrito: postagem.conteudo_escrito,
            user_id: postagem.user_id,
        };
        
        // ✅ Campos opcionais - só adiciona se existirem (não undefined/null)
        if (postagem.conteudo_midia !== undefined && postagem.conteudo_midia !== null) {
            dadosPostagem['conteudo_midia'] = postagem.conteudo_midia;
        }
        if (postagem.data_criacao) dadosPostagem['data_criacao'] = postagem.data_criacao;
        if (postagem.data_alteracao) dadosPostagem['data_alteracao'] = postagem.data_alteracao;
        if (postagem.curtidas) dadosPostagem['curtidas'] = postagem.curtidas;
        
        // ✅ Se tem id, é update; se não tem, é insert
        if (postagem.id) {
            console.info(`Atualizando postagem com ID: ${postagem.id}`);
            await this.provedor.salvar('postagens', dadosPostagem, postagem.id);
        } else {
            console.info('Criando nova postagem');
            await this.provedor.salvar('postagens', dadosPostagem);
        }
    }
    async DeletarPostagem(id: string): Promise<void> {
        const excluir = await this.provedor.excluir('postagens', id);
        if (excluir) {
            return;
        }
        throw new Error('Erro ao deletar postagem');
    }
    async BuscarPostagemPorId(id: string): Promise<Postagem | null> {
        const postagem = await this.provedor.buscarPorId<Postagem>('postagens', id);
        console.info('Postagem buscada por ID:', postagem);
        return postagem;
    }
    async BuscarPostagensPorUsuarioId(usuarioId: Postagem['user_id']): Promise<Postagem[]> {
        // return await this.provedor.buscarPorCampo<Postagem>('postagens', 'userId', usuarioId);
        throw new Error('Method not implemented.');
    }

}