import { Postagem } from '@fit-hub/core';
import { RepositorioPostagem } from '@fit-hub/core';
import ProvedorDados from '../providers/ProvedorDados';

export default class ColecaoPostagem implements RepositorioPostagem {
    constructor(private provedor: ProvedorDados) {}

    async SalvarPostagem(postagem: Postagem): Promise<void> {
        // ✅ Monta objeto apenas com campos obrigatórios
        const dadosPostagem: Record<string, unknown> = {
            conteudoEscrito: postagem.conteudoEscrito,
            userId: postagem.userId,
        };
        
        // ✅ Campos opcionais - só adiciona se existirem (não undefined/null)
        if (postagem.conteudoMidia !== undefined && postagem.conteudoMidia !== null) {
            dadosPostagem['conteudoMidia'] = postagem.conteudoMidia;
        }
        if (postagem.dataCriacao) dadosPostagem['dataCriacao'] = postagem.dataCriacao;
        if (postagem.dataAlteracao) dadosPostagem['dataAlteracao'] = postagem.dataAlteracao;
        if (postagem.comentarioId) dadosPostagem['comentarioId'] = postagem.comentarioId;
        if (postagem.curtidas) dadosPostagem['curtidas'] = postagem.curtidas;
        
        // ✅ Se tem id, é update; se não tem, é insert
        if (postagem.id) {
            await this.provedor.salvar('postagens', dadosPostagem, postagem.id);
        } else {
            await this.provedor.salvar('postagens', dadosPostagem);
        }
    }
    DeletarPostagem(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    BuscarPostagemPorId(id: string): Promise<Postagem | null> {
        throw new Error('Method not implemented.');
    }
    BuscarPostagensPorUsuarioId(usuarioId: Postagem['userId']): Promise<Postagem[]> {
        throw new Error('Method not implemented.');
    }

}