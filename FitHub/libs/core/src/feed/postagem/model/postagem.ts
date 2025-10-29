import Curtida from "../../curtida/model/curtida";
import Usuario from "../../../usuario/model/Usuario";

export default interface Postagem {
    id?: string;
    user_id: Usuario["id"];
    conteudo_escrito: string;
    conteudo_midia?: string;
    data_criacao?: Date;
    data_alteracao?: Date;
    curtidas?: Curtida["id"][];
}