import senhaHash from '../../../../../core/src/usuarios/provider/ProvedorsenhaHash';
import bcrypt from 'bcrypt'

export default class SenhaEmHash implements senhaHash {
    criptografar(senha: string): string {
        const salt = bcrypt.genSaltSync(10) // Ingrediente de entrada, quantidade de rodadas (consome bastante processador)
        return bcrypt.hashSync(senha, salt) // Passa a senha e o salt
    }

}