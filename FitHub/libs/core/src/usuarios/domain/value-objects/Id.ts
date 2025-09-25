export class Id {
    private constructor(private readonly _valor: string) {
        this.validar();
    }

    static gerar(): Id {
        return new Id(Id.gerarUUID());
    }

    private static gerarUUID(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    static criar(id: string): Id {
        return new Id(id);
    }

    private validar(): void {
        if (!this._valor || this._valor.trim().length === 0) {
            throw new Error('Id não pode ser vazio');
        }

        // Validação UUID v4 básica
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(this._valor)) {
            throw new Error('Id deve ser um UUID válido');
        }
    }

    get valor(): string {
        return this._valor;
    }

    equals(other: Id): boolean {
        return this._valor === other._valor;
    }

    toString(): string {
        return this._valor;
    }
}
