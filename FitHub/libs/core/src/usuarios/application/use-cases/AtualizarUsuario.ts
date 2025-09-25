import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';
import { IPasswordHasher } from '../ports/IPasswordHasher';
import { Usuario } from '../../domain/entities/Usuario';
import { Email } from '../../domain/value-objects/Email';
import { Nome } from '../../domain/value-objects/Nome';
import { Senha } from '../../domain/value-objects/Senha';

export interface AtualizarUsuarioInput {
    id: string;
    nome?: string;
    email?: string;
    senha?: string;
    peso?: number;
    altura?: number;
    idade?: number;
}

export interface AtualizarUsuarioOutput {
    id: string;
    nome: string;
    email: string;
    atualizadoEm: Date;
}

export class AtualizarUsuario {
    constructor(
        private readonly usuarioRepository: IUsuarioRepository,
        private readonly passwordHasher: IPasswordHasher
    ) {}

    async executar(input: AtualizarUsuarioInput): Promise<AtualizarUsuarioOutput> {
        const usuarioAtual = await this.usuarioRepository.buscarPorId(input.id);
        if (!usuarioAtual) {
            throw new Error('Usuário não encontrado');
        }

        const novoNome = Nome.criar(input.nome ?? usuarioAtual.nome);
        const novoEmail = Email.criar(input.email ?? usuarioAtual.email);

        if (novoEmail.valor !== usuarioAtual.email) {
            const usuarioComMesmoEmail = await this.usuarioRepository.buscarPorEmail(novoEmail.valor);
            if (usuarioComMesmoEmail && usuarioComMesmoEmail.id !== usuarioAtual.id) {
                throw new Error('Outro usuário já utiliza este email');
            }
        }

        let senhaHash = usuarioAtual.senha.valor;
        if (input.senha) {
            const senhaNova = Senha.criar(input.senha);
            senhaHash = await this.passwordHasher.hash(senhaNova.valor);
        }

        const peso = input.peso ?? usuarioAtual.peso;
        const altura = input.altura ?? usuarioAtual.altura;
        const idade = input.idade ?? usuarioAtual.idade;

        const usuarioAtualizado = Usuario.reconstituir(
            usuarioAtual.id,
            novoNome.valor,
            novoEmail.valor,
            senhaHash,
            peso,
            altura,
            idade,
            usuarioAtual.criadoEm
        );

        await this.usuarioRepository.atualizar(usuarioAtualizado);

        return {
            id: usuarioAtualizado.id,
            nome: usuarioAtualizado.nome,
            email: usuarioAtualizado.email,
            atualizadoEm: new Date(),
        };
    }
}