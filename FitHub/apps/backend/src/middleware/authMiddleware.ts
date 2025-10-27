import { Request, Response, NextFunction } from 'express';
import { Jwt } from '@fit-hub/backendAdapters';

export interface AuthRequest extends Request {
  user?: string | object;
}

export const verificarToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Buscar token no header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Token não fornecido' });
      return;
    }

    // Extrair o token (remove "Bearer ")
    const token = authHeader.substring(7);

    // Verificar e decodificar o token
    // JWT_SECRET deve vir do .env - não aceita fallback inseguro
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET não configurado');
    }
    const provedorJwt = new Jwt(process.env.JWT_SECRET);
    const decoded = provedorJwt.obter(token);

    // Anexar dados decodificados ao request
    req.user = decoded;

    // Continuar para próxima função
    next();
  } catch {
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
};
