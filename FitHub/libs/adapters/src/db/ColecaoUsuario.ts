import { RepositorioUsuario } from '@fit-hub/core';
import ProvedorDados, { Filtro } from '../providers/ProvedorDados';

export interface Usuario {
    nome: string;
    email: string;
    senha: string;
    peso: number;
    altura: number;
    idade: number;
}

export default class ColecaoUsuario implements RepositorioUsuario {
    constructor(private provedor: ProvedorDados) {}

    async RegistrarUsuario(usuario: Usuario): Promise<void> {
        // ✅ Não loga dados do usuário (contém senha)
        
        // Monta o objeto sem ID para INSERT (deixa o banco gerar)
        const dadosUsuario: Record<string, unknown> = {
            nome: usuario.nome,
            email: usuario.email,
            senha: usuario.senha,
            peso: usuario.peso,
            altura: usuario.altura,
            idade: usuario.idade
        };

        // Não passa o terceiro parâmetro (id) para forçar INSERT
        await this.provedor.salvar('usuarios', dadosUsuario);
    }

    async BuscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
        const filtros: Filtro[] = [{
            campo: 'email',
            operador: 'igual',
            valor: email
        }];

        return await this.provedor.buscarPrimeiro<Usuario>('usuarios', filtros);
    }

    async BuscarUsuarioPorId(id: string): Promise<Usuario | null> {
        return await this.provedor.buscarPorId<Usuario>('usuarios', id);
    }

    async CalcularKcal(usuario: Usuario): Promise<Usuario> {
        // Implementação do cálculo de Kcal aqui
        // Por agora, retorna o usuário como está
        return usuario;
    }
}