export class Nome {
    private static readonly MIN_LENGTH = 2;
    private static readonly MAX_LENGTH = 100;
    private static readonly EMOJI_REGEX = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
    private static readonly VALID_CHARS_REGEX = /^[A-Za-zÀ-ÿ\s'-]+$/;

    private constructor(private readonly _valor: string) {
        this.validar();
    }

    static criar(nome: string): Nome {
        return new Nome(nome);
    }

    private validar(): void {
        if (!this._valor || this._valor.trim().length === 0) {
            throw new Error('Nome não pode ser vazio');
        }

        const nomeLimpo = this.limpar(this._valor);

        if (nomeLimpo.length < Nome.MIN_LENGTH) {
            throw new Error(`Nome deve ter pelo menos ${Nome.MIN_LENGTH} caracteres`);
        }

        if (nomeLimpo.length > Nome.MAX_LENGTH) {
            throw new Error(`Nome não pode ter mais que ${Nome.MAX_LENGTH} caracteres`);
        }

        if (!Nome.VALID_CHARS_REGEX.test(nomeLimpo)) {
            throw new Error('Nome deve conter apenas letras, espaços, hífens e apostrofes');
        }
    }

    private limpar(nome: string): string {
        return nome
            .trim()
            .replace(Nome.EMOJI_REGEX, '')
            .replace(/\s+/g, ' '); // Remove espaços extras
    }

    get valor(): string {
        return this.padronizar(this._valor);
    }

    private padronizar(nome: string): string {
        const nomeLimpo = this.limpar(nome);
        
        return nomeLimpo
            .split(' ')
            .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase())
            .join(' ');
    }

    get primeiroNome(): string {
        return this.valor.split(' ')[0];
    }

    get ultimoNome(): string {
        const partes = this.valor.split(' ');
        return partes[partes.length - 1];
    }

    equals(other: Nome): boolean {
        return this.valor === other.valor;
    }

    toString(): string {
        return this.valor;
    }
}