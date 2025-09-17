export interface HashService {
  hash(password: string): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>;
}

export interface JwtService {
  sign(payload: Record<string, unknown>): string;
  verify(token: string): Record<string, unknown> | null;
}