// DTO para comunicação entre front/adapters e serviços
export interface UsuarioDTO {
  id?: string;
  nome: string;
  email: string;
  senha?: string;
  peso?: number;
  altura?: number;
  idade?: number;
  genero?: string;
}
