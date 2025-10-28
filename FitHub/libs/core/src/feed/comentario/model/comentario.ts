import Postagem from "../../postagem/model/postagem";
import Usuario from "../../../usuario/model/Usuario";

export default interface Comentario {
    id: string;
    usuarioId: Usuario["id"];
    postagemId: Postagem["id"];
    conteudo: string;
    dataCriacao: Date;
    dataAlteracao: Date;
}
