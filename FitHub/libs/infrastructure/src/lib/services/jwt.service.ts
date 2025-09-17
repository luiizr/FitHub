import * as jwt from 'jsonwebtoken';
import { JwtService } from '@fithub/application';

export class JsonWebTokenService implements JwtService {
  private readonly secret = process.env['JWT_SECRET'] || 'your-secret-key';
  private readonly expiresIn = '1d';

  sign(payload: Record<string, unknown>): string {
    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string): Record<string, unknown> | null {
    try {
      return jwt.verify(token, this.secret) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}