export interface IPasswordHasher {
    hash(senha: string): Promise<string>;
    comparar(senhaTexto: string, hash: string): Promise<boolean>;
    validarForca(senha: string): boolean;
}