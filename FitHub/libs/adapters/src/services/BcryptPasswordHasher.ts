import * as bcrypt from 'bcryptjs';
import { IPasswordHasher } from '@fit-hub/core';

export class BcryptPasswordHasher implements IPasswordHasher {
    private readonly saltRounds = 12;

    async hash(senha: string): Promise<string> {
        return bcrypt.hash(senha, this.saltRounds);
    }

    async comparar(senha: string, hash: string): Promise<boolean> {
        return bcrypt.compare(senha, hash);
    }

    validarForca(senha: string): boolean {
        if (!senha || senha.length < 8) {
            return false;
        }

        const possuiMinuscula = /[a-z]/.test(senha);
        const possuiMaiuscula = /[A-Z]/.test(senha);
        const possuiNumero = /\d/.test(senha);
        const possuiEspecial = /[@$!%*?&]/.test(senha);

        return possuiMinuscula && possuiMaiuscula && possuiNumero && possuiEspecial;
    }
}