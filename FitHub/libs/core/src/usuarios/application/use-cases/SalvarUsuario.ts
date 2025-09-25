import { Usuario } from '../../domain/entities/Usuario';
import { IUsuarioRepository } from '../../domain/repositories/IUsuarioRepository';
import { IPasswordHasher } from '../ports/IPasswordHasher';
import { IEventPublisher, UsuarioCriadoEvent } from '../ports/IEventPublisher';
import { Id } from '../../domain/value-objects/Id';

export interface SalvarUsuarioInput {
    nome: string;
    email: string;
    senha: string;
    peso: number;
    altura: number;
    idade: number;
}

export interface SalvarUsuarioOutput {
    id: string;
    nome: string;
    email: string;
    criadoEm: Date;
}

export class SalvarUsuario {
    constructor(
        private readonly usuarioRepository: IUsuarioRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly eventPublisher?: IEventPublisher
    ) {}

    async executar(input: SalvarUsuarioInput): Promise<SalvarUsuarioOutput> {
        // Verificar se usuário já existe
        const usuarioExistente = await this.usuarioRepository.existePorEmail(input.email);
        if (usuarioExistente) {
            throw new Error('Usuário com este email já existe');
        }

        // Criar entidade de usuário
        const usuario = Usuario.criar(
            input.nome,
            input.email,
            input.senha,
            input.peso,
            input.altura,
            input.idade
        );

        // Hash da senha
        const senhaHasheada = await this.passwordHasher.hash(usuario.senha.valor);
        
        // Reconstitui usuário com senha hasheada para persistência
        const usuarioParaSalvar = Usuario.reconstituir(
            usuario.id,
            usuario.nome,
            usuario.email,
            senhaHasheada,
            usuario.peso,
            usuario.altura,
            usuario.idade,
            usuario.criadoEm
        );

        // Salvar no repositório
        await this.usuarioRepository.salvar(usuarioParaSalvar);

        // Publicar evento de domínio
        if (this.eventPublisher) {
            const evento = new UsuarioCriadoEvent(
                usuario.id,
                Id.gerar().valor,
                usuario.email,
                usuario.nome
            );
            await this.eventPublisher.publicar(evento);
        }

        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            criadoEm: usuario.criadoEm
        };
    }
}