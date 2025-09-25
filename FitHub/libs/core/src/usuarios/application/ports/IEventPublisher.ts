export interface IEventPublisher {
    publicar(evento: DomainEvent): Promise<void>;
}

export interface DomainEvent {
    agregadoId: string;
    eventoId: string;
    tipoEvento: string;
    ocorridoEm: Date;
    dados: Record<string, unknown>;
}

export class UsuarioCriadoEvent implements DomainEvent {
    constructor(
        public readonly agregadoId: string,
        public readonly eventoId: string,
        public readonly usuarioEmail: string,
        public readonly usuarioNome: string,
        public readonly ocorridoEm: Date = new Date()
    ) {}

    get tipoEvento(): string {
        return 'UsuarioCriado';
    }

    get dados(): Record<string, unknown> {
        return {
            email: this.usuarioEmail,
            nome: this.usuarioNome
        };
    }
}