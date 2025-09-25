export class Nome {
    private static readonly MIN_LENGTH = 4;
    private static readonly EMOJI_REGEX = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
    private static readonly LETTERS_REGEX = /^[A-Za-zÀ-ÿ\s'-]+$/;

    static padronizar(nome: string): string {
        if (!nome) throw new Error('Nome não pode ser vazio.');
        let nomeLimpo = nome.trim();

        // Remove emojis
        nomeLimpo = nomeLimpo.replace(Nome.EMOJI_REGEX, '');

        // Valida tamanho mínimo
        if (nomeLimpo.length < Nome.MIN_LENGTH) {
            throw new Error(`Nome deve ter pelo menos ${Nome.MIN_LENGTH} letras.`);
        }

        // Valida apenas letras e caracteres permitidos
        if (!Nome.LETTERS_REGEX.test(nomeLimpo)) {
            throw new Error('Nome deve conter apenas letras e caracteres permitidos.');
        }

        // Primeira letra maiúscula, restante minúsculo
        nomeLimpo = nomeLimpo.charAt(0).toUpperCase() + nomeLimpo.slice(1).toLowerCase();

        return nomeLimpo;
    }
}