import { Express, Response } from 'express';
import { RepositorioUsuario } from '@fit-hub/core';
import {
  AuthRequest,
  verificarToken,
} from '../../../middleware/authMiddleware';

export default class UsuarioController {
  constructor(servidor: Express, repoUsuario: RepositorioUsuario) {
    // GET /api/usuario - Busca dados do usuário logado
    servidor.get(
      '/api/usuario',
      verificarToken,
      async (req: AuthRequest, res: Response) => {
        try {
          // O middleware verificarToken coloca o user_id em req.user
          const userPayload = req.user as Record<string, string>;
          const userId = userPayload?.id;

          if (!userId) {
            return res
              .status(400)
              .json({ message: 'ID do usuário não encontrado no token' });
          }

          const usuario = await repoUsuario.BuscarUsuarioPorId(userId);

          if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
          }

          // Nunca retornar senha!
          const usuarioSeguro = { ...usuario, senha: undefined };

          res.status(200).json(usuarioSeguro);
        } catch {
          res.status(500).json({ message: 'Erro ao buscar usuário' });
        }
      }
    );

    // PUT /api/usuario - Atualizar dados do usuário (para implementar no futuro)
    servidor.put(
      '/api/usuario',
      verificarToken,
      async (req: AuthRequest, res: Response) => {
        try {
          const userPayload = req.user as Record<string, string>;
          const userId = userPayload?.id;

          // Validações básicas
          if (!userId) {
            return res
              .status(400)
              .json({ message: 'ID do usuário não encontrado' });
          }

          // TODO: Implementar lógica de atualização

          res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch {
          // ✅ Não loga erro (pode expor estrutura do banco)
          res.status(500).json({ message: 'Erro ao atualizar usuário' });
        }
      }
    );
  }
}
