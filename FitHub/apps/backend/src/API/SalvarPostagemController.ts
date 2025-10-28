import { Express, Response } from 'express';
import { SalvarPostagem, Postagem } from '@fit-hub/core';
import { AuthRequest, verificarToken } from '../middleware/authMiddleware';

export default class SalvarPostagemController {
    constructor(
        servidor: Express,
        cdu: SalvarPostagem,
    ) {
        servidor.post('/api/salvarPostagem', verificarToken, async (req: AuthRequest, res: Response) => {
            try {
                const postagem: any = {
                    conteudoEscrito: req.body.conteudoEscrito,
                    userId: req.body.userId,
                };
                
                // Campos opcionais - só adiciona se existirem
                if (req.body.conteudoMidia) postagem.conteudoMidia = req.body.conteudoMidia;
                if (req.body.dataAlteracao) postagem.dataAlteracao = req.body.dataAlteracao;
                if (req.body.comentarioId) postagem.comentarioId = req.body.comentarioId;
                if (req.body.curtidas && req.body.curtidas.length > 0) postagem.curtidas = req.body.curtidas;
                if (req.body.id) postagem.id = req.body.id;
                
                const resultado = await cdu.executar(postagem);
                await cdu.executar(postagem)
                res.status(201).json({ message: 'Postagem salva com sucesso', resultado });
            } catch (error) {
                res.status(500).json({ message: 'Erro ao salvar postagem', error });
            }
        })
    }
}