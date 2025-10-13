import { Express } from 'express';
import LoginUsuario from '../../../../libs/core/src/usuario/service/LoginUsuario';
import ProvedorJwt from '../../../../libs/adapters/src/providers/Jwt/ProvedorJwt';

export default class LoginUsuarioController {
    constructor(
        servidor: Express,
        cdu: LoginUsuario
    ) {
        servidor.post('api/login', async (req, res) => {
            try {
                const usuario = await cdu.executar({
                    email: req.body.email,
                    senha: req.body.senha
                })
                const provedorJwt = new ProvedorJwt(process.env.JWT_SECRET)

                res.status(200).send(provedorJwt.gerar(usuario))
            } catch (error) {
                res.status(401).send({ message: error.message })
            }
        })
    }
}