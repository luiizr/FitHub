import { Express, Response } from 'express';
import { ListarPostagens } from '@fit-hub/core';
import {
  AuthRequest,
  verificarToken,
} from '../../../middleware/authMiddleware';

export default class ListarPostagensController {
  constructor(servidor: Express, cdu: ListarPostagens) {
    servidor.get(
      '/api/listarPostagens',
      verificarToken,
      async (req: AuthRequest, res: Response) => {
        try {
          const postagens = await cdu.executar();
          res.status(200).json(postagens);
        } catch (error) {
          res.status(500).json({ message: 'Erro ao listar postagens', error });
        }
      }
    );
  }
}
