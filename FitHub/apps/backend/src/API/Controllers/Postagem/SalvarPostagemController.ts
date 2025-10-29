import { Express, Response } from 'express';
import { SalvarPostagem, Postagem } from '@fit-hub/core';
import {
  AuthRequest,
  verificarToken,
} from '../../../middleware/authMiddleware';

export default class SalvarPostagemController {
  constructor(servidor: Express, cdu: SalvarPostagem) {
    servidor.post(
      '/api/salvarPostagem',
      verificarToken,
      async (req: AuthRequest, res: Response) => {
        try {
          const postagem: any = {
            conteudo_escrito: req.body.conteudo_escrito,
            user_id: req.body.user_id,
          };

          // Campos opcionais - só adiciona se existirem
          if (req.body.conteudo_midia)
            postagem.conteudo_midia = req.body.conteudo_midia;
          if (req.body.data_alteracao)
            postagem.data_alteracao = req.body.data_alteracao;
          if (req.body.comentario_id)
            postagem.comentario_id = req.body.comentario_id;
          if (req.body.curtidas && req.body.curtidas.length > 0)
            postagem.curtidas = req.body.curtidas;
          if (req.body.id) postagem.id = req.body.id;

          const resultado = await cdu.executar(postagem);
          res.status(201)
            .json({ message: 'Postagem salva com sucesso', resultado });
        } catch (error) {
          res.status(500).json({ message: 'Erro ao salvar postagem', error });
        }
      }
    );
  }
}
