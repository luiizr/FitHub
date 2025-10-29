import Postagem from "../../postagem/model/postagem";
import Usuario from "../../../usuario/model/Usuario";
import Comentario from "../../comentario/model/comentario";

export default interface Curtida {
    id: string;
    user_id: Usuario["id"];
    postagem_id?: Postagem["id"];
    comentario_id?: Comentario["id"];
}