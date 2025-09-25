import { Id } from '../value-objects/Id';
import { Nome } from '../value-objects/Nome';
import { Email } from '../value-objects/Email';
import { Senha } from '../value-objects/Senha';

export interface DadosFisicos {
    peso: number;
    altura: number;
    idade: number;
}

export class Usuario {
    private constructor(
        private readonly _id: Id,
        private readonly _nome: Nome,
        private readonly _email: Email,
        private readonly _senha: Senha,
        private readonly _dadosFisicos: DadosFisicos,
        private readonly _criadoEm: Date = new Date()
    ) {
        this.validarDadosFisicos();
    }

    static criar(
        nome: string,
        email: string,
        senha: string,
        peso: number,
        altura: number,
        idade: number
    ): Usuario {
        return new Usuario(
            Id.gerar(),
            Nome.criar(nome),
            Email.criar(email),
            Senha.criar(senha),
            { peso, altura, idade }
        );
    }

    static reconstituir(
        id: string,
        nome: string,
        email: string,
        senhaHash: string,
        peso: number,
        altura: number,
        idade: number,
        criadoEm?: Date
    ): Usuario {
        return new Usuario(
            Id.criar(id),
            Nome.criar(nome),
            Email.criar(email),
            Senha.reconstituir(senhaHash),
            { peso, altura, idade },
            criadoEm || new Date()
        );
    }

    private validarDadosFisicos(): void {
        if (this._dadosFisicos.peso <= 0 || this._dadosFisicos.peso > 1000) {
            throw new Error('Peso deve estar entre 1 e 1000 kg');
        }
        if (this._dadosFisicos.altura <= 0 || this._dadosFisicos.altura > 300) {
            throw new Error('Altura deve estar entre 1 e 300 cm');
        }
        if (this._dadosFisicos.idade < 13 || this._dadosFisicos.idade > 120) {
            throw new Error('Idade deve estar entre 13 e 120 anos');
        }
    }

    // Getters
    get id(): string {
        return this._id.valor;
    }

    get nome(): string {
        return this._nome.valor;
    }

    get email(): string {
        return this._email.valor;
    }

    get senha(): Senha {
        return this._senha;
    }

    get peso(): number {
        return this._dadosFisicos.peso;
    }

    get altura(): number {
        return this._dadosFisicos.altura;
    }

    get idade(): number {
        return this._dadosFisicos.idade;
    }

    get criadoEm(): Date {
        return this._criadoEm;
    }

    // Métodos de negócio específicos do FitHub
    calcularIMC(): number {
        const alturaEmMetros = this._dadosFisicos.altura / 100;
        return Number((this._dadosFisicos.peso / (alturaEmMetros * alturaEmMetros)).toFixed(2));
    }

    obterCategoriaIMC(): string {
        const imc = this.calcularIMC();
        if (imc < 18.5) return 'Abaixo do peso';
        if (imc < 25) return 'Peso normal';
        if (imc < 30) return 'Sobrepeso';
        return 'Obesidade';
    }

    calcularTMB(): number {
        // Fórmula de Harris-Benedict revisada
        const peso = this._dadosFisicos.peso;
        const altura = this._dadosFisicos.altura;
        const idade = this._dadosFisicos.idade;

        // Assumindo masculino por padrão (deveria ser um campo)
        return Math.round(88.362 + (13.397 * peso) + (4.799 * altura) - (5.677 * idade));
    }

    obterMetasCaloricasPorObjetivo(objetivo: 'perder' | 'manter' | 'ganhar'): number {
        const tmb = this.calcularTMB();
        const fatorAtividade = 1.55; // Moderadamente ativo

        const gastoTotal = tmb * fatorAtividade;

        switch (objetivo) {
            case 'perder':
                return Math.round(gastoTotal - 500); // Déficit de 500 calorias
            case 'manter':
                return Math.round(gastoTotal);
            case 'ganhar':
                return Math.round(gastoTotal + 300); // Superávit de 300 calorias
            default:
                return Math.round(gastoTotal);
        }
    }

    podeParticiparAtividade(): boolean {
        // Regras básicas de segurança
        const imc = this.calcularIMC();
        return imc >= 16 && imc <= 45 && this._dadosFisicos.idade >= 13;
    }

    obterResumoFisico(): string {
        const imc = this.calcularIMC();
        const categoria = this.obterCategoriaIMC();
        const tmb = this.calcularTMB();

        return `${this._nome.primeiroNome} - IMC: ${imc} (${categoria}) - TMB: ${tmb} cal/dia`;
    }

    // Métodos de comparação
    equals(other: Usuario): boolean {
        return this._id.equals(Id.criar(other.id));
    }

    toString(): string {
        return `Usuario(${this.id}, ${this.nome}, ${this.email})`;
    }
}