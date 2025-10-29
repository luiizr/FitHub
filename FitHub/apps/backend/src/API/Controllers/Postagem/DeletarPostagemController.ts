import { Express, Response } from 'express';
import { DeletarPostagem } from '@fit-hub/core';
import {
  AuthRequest,
  verificarToken,
} from '../../../middleware/authMiddleware';

export default class DeletarPostagemController {
  constructor(servidor: Express, cdu: DeletarPostagem) {
    servidor.delete(
      '/api/deletarPostagem',
      verificarToken,
      async (req: AuthRequest, res: Response) => {
        try {
          await cdu.executar({ id: req.body.id, user_id: req.body.user_id });
          res.status(200).json({ message: 'Postagem deletada com sucesso' });
        } catch (error) {
          res.status(500).json({ message: 'Erro ao deletar postagem', error });
        }
      }
    );
  }
}
