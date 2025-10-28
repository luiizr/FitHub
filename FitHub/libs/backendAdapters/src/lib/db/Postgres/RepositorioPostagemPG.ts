import { CallbackMudanca, CancelarEscuta, ComandoBatch, ConteudoArquivo, Filtro, Identificador, Ordenacao, Pagina, ProvedorDados } from "@fit-hub/adapters";
import db from "./db";

export default class RepositorioPostagemPG implements ProvedorDados {

    async salvar<T = Record<string, unknown>>(
        repositorio: string,
        entidade: Record<string, unknown>,
        id?: Identificador
    ): Promise<T> {
        // ✅ Filtrar campos undefined/null para não enviar ao banco
        const entidadeLimpa: Record<string, unknown> = {};
        Object.keys(entidade).forEach(key => {
            if (entidade[key] !== undefined && entidade[key] !== null) {
                entidadeLimpa[key] = entidade[key];
            }
        });

        const campos = Object.keys(entidadeLimpa);
        const valores = Object.values(entidadeLimpa);
        
        if (id) {
            // UPDATE
            const setClauses = campos.map((campo, index) => `${campo} = $${index + 2}`).join(', ');
            const query = `UPDATE ${repositorio} SET ${setClauses} WHERE id = $1 RETURNING *`;
            const result = await db.one(query, [id, ...valores]);
            return result as T;
        } else {
            // INSERT
            const placeholders = valores.map((_, index) => `$${index + 1}`).join(', ');
            const query = `INSERT INTO ${repositorio} (${campos.join(', ')}) VALUES (${placeholders}) RETURNING *`;
            const result = await db.one(query, valores);
            return result as T;
        }
    }


    salvarVarios(repositorio: string, entidades: Record<string, unknown>[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    atualizarCampos(repositorio: string, id: Identificador, campos: Record<string, unknown>): Promise<void> {
        throw new Error("Method not implemented.");
    }
    excluir(repositorio: string, id: Identificador): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    excluirVarios(repositorio: string, ids: Identificador[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    buscarPorId<T = Record<string, unknown>>(repositorio: string, id: Identificador): Promise<T | null> {
        throw new Error("Method not implemented.");
    }
    buscarPorIds<T = Record<string, unknown>>(repositorio: string, ids: Identificador[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    buscarTodos<T = Record<string, unknown>>(repositorio: string, ordenacao?: Ordenacao): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    buscarComFiltros<T = Record<string, unknown>>(repositorio: string, filtros: Filtro[], ordenacao?: Ordenacao, limite?: number): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    buscarPaginado<T = Record<string, unknown>>(repositorio: string, ordenacao: Ordenacao, limite?: number, offset?: number, filtros?: Filtro[]): Promise<Pagina<T>> {
        throw new Error("Method not implemented.");
    }
    buscarPrimeiro<T = Record<string, unknown>>(repositorio: string, filtros?: Filtro[]): Promise<T | null> {
        throw new Error("Method not implemented.");
    }
    buscarTexto<T = Record<string, unknown>>(repositorio: string, texto: string, campos?: string[], limite?: number): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
    existe(repositorio: string, id: Identificador): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    contar(repositorio: string, filtros?: Filtro[]): Promise<number> {
        throw new Error("Method not implemented.");
    }
    executarLote(operacoes: ComandoBatch[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    executarTransacao(operacoes: ComandoBatch[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    escutarEntidade?<T = Record<string, unknown>>(repositorio: string, id: Identificador, callback: CallbackMudanca<T>): CancelarEscuta {
        throw new Error("Method not implemented.");
    }
    escutarConsulta?<T = Record<string, unknown>>(repositorio: string, filtros: Filtro[], callback: CallbackMudanca<T>, ordenacao?: Ordenacao): CancelarEscuta {
        throw new Error("Method not implemented.");
    }
    adicionarAoArray?(repositorio: string, id: Identificador, campo: string, valor: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }
    uploadArquivo?(nome: string, conteudo: ConteudoArquivo, tipoMime: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    validarConexao(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    executarConsultaCustomizada?<T = Record<string, unknown>>(consulta: string, parametros?: unknown[]): Promise<T[]> {
        throw new Error("Method not implemented.");
    }
}