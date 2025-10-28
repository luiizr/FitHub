import Postagem from "../../postagem/model/postagem";
import Usuario from "../../../usuario/model/Usuario";
import Comentario from "../../comentario/model/comentario";

export default interface Curtida {
    id: string;
    userId: Usuario["id"];
    postagemId?: Postagem["id"];
    comentarioId?: Comentario["id"];
}