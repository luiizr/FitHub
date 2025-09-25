export class Senha {
    private constructor(
        private readonly _hash: string,
        private readonly _isHashed = false
    ) {}

    static criar(senhaTexto: string): Senha {
        this.validarSenhaTexto(senhaTexto);
        return new Senha(senhaTexto, false);
    }

    static reconstituir(hash: string): Senha {
        if (!hash || hash.trim().length === 0) {
            throw new Error('Hash da senha não pode ser vazio');
        }
        return new Senha(hash, true);
    }

    private static validarSenhaTexto(senha: string): void {
        if (!senha || senha.length === 0) {
            throw new Error('Senha não pode ser vazia');
        }

        if (senha.length < 8) {
            throw new Error('Senha deve ter pelo menos 8 caracteres');
        }

        if (!/(?=.*[a-z])/.test(senha)) {
            throw new Error('Senha deve conter pelo menos uma letra minúscula');
        }

        if (!/(?=.*[A-Z])/.test(senha)) {
            throw new Error('Senha deve conter pelo menos uma letra maiúscula');
        }

        if (!/(?=.*\d)/.test(senha)) {
            throw new Error('Senha deve conter pelo menos um número');
        }

        if (!/(?=.*[@$!%*?&])/.test(senha)) {
            throw new Error('Senha deve conter pelo menos um caractere especial (@$!%*?&)');
        }
    }

    get valor(): string {
        return this._hash;
    }

    get isHashed(): boolean {
        return this._isHashed;
    }

    calcularForcaSenha(): 'Fraca' | 'Média' | 'Forte' | 'Muito Forte' {
        if (this._isHashed) {
            throw new Error('Não é possível calcular força de senha hasheada');
        }

        let pontos = 0;
        const senha = this._hash;

        // Comprimento
        if (senha.length >= 8) pontos += 1;
        if (senha.length >= 12) pontos += 1;
        if (senha.length >= 16) pontos += 1;

        // Complexidade
        if (/[a-z]/.test(senha)) pontos += 1;
        if (/[A-Z]/.test(senha)) pontos += 1;
        if (/\d/.test(senha)) pontos += 1;
        if (/[@$!%*?&]/.test(senha)) pontos += 1;

        if (pontos <= 3) return 'Fraca';
        if (pontos <= 5) return 'Média';
        if (pontos <= 6) return 'Forte';
        return 'Muito Forte';
    }

    toString(): string {
        return this._isHashed ? '[SENHA HASHEADA]' : '[SENHA PROTEGIDA]';
    }
}