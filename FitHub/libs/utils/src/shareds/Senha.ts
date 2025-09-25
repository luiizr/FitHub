export class Senha {
    /**
     * Valida se a senha é forte.
     * Regras:
     * - Mínimo 8 caracteres
     * - Pelo menos uma letra maiúscula
     * - Pelo menos uma letra minúscula
     * - Pelo menos um número
     * - Pelo menos um caractere especial
     */
    static validarSenhaForte(senha: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return regex.test(senha);
    }
}