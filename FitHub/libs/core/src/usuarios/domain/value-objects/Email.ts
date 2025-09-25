export class Email {
    private constructor(private readonly _valor: string) {
        this.validar();
    }

    static criar(email: string): Email {
        return new Email(email);
    }

    private validar(): void {
        if (!this._valor || this._valor.trim().length === 0) {
            throw new Error('Email não pode ser vazio');
        }

        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailRegex.test(this._valor.trim())) {
            throw new Error('Email deve ter um formato válido');
        }
    }

    get valor(): string {
        return this.padronizar(this._valor);
    }

    private padronizar(email: string): string {
        const emailLimpo = email.trim().toLowerCase();
        
        // Tratamento especial para Gmail
        const gmailRegex = /^([^@]+)@gmail\.com$/;
        const match = emailLimpo.match(gmailRegex);
        if (match) {
            const local = match[1].replace(/\./g, '');
            return `${local}@gmail.com`;
        }

        return emailLimpo;
    }

    get dominio(): string {
        return this.valor.split('@')[1];
    }

    get usuario(): string {
        return this.valor.split('@')[0];
    }

    equals(other: Email): boolean {
        return this.valor === other.valor;
    }

    toString(): string {
        return this.valor;
    }
}