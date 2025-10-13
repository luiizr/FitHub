export default interface Usuario {
    id?: string
    nome: string
    email: string
    senha?: string

    idade: number
    peso: number
    altura: number

    TMB?: string // Taxa de Metabolismo Basal
    FA?: string // Fator Atividade
}