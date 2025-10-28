import Comentario from "../../comentario/model/comentario";
import Curtida from "../../curtida/model/curtida";
import Usuario from "../../../usuario/model/Usuario";

export default interface Postagem {
    id?: string;
    userId: Usuario["id"];
    conteudoEscrito: string;
    conteudoMidia?: string;
    dataCriacao?: Date;
    dataAlteracao?: Date;
    comentarioId?: Comentario["id"][];
    curtidas?: Curtida["id"][];
}