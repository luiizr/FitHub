import { Express } from 'express';
import LoginUsuario from '../../../../libs/core/src/usuario/service/LoginUsuario';
import Jwt from '../../../../libs/backendAdapters/src/lib/Jwt/Jwt';
import ProvedorCriptografia from 'libs/adapters/src/providers/ProvedorCriptografia';
import { ColecaoUsuario } from '@fit-hub/adapters';

export default class LoginUsuarioController {
    constructor(
        servidor: Express,
        cdu: LoginUsuario,
        provedorCripto: ProvedorCriptografia,
        bdUsuario: ColecaoUsuario,
    ) {
        servidor.post('/api/login', async (req, res) => {
            const usuarioExiste = await bdUsuario.BuscarUsuarioPorEmail(req.body.email)
            if (!usuarioExiste) {
                return res.status(404).send({ message: 'Usuário não encontrado' })
            }
            const senhaValida = await provedorCripto.comparar(req.body.senha, usuarioExiste.senha!)
            if (!senhaValida) {
                return res.status(401).send({ message: 'Senha inválida' })
            }
            
            try {
                const usuario = await cdu.executar({
                    email: req.body.email,
                    senha: req.body.senha
                })
                const provedorJwt = new Jwt(process.env.JWT_SECRET)

                res.status(200).send(provedorJwt.gerar(usuario))
            } catch (error) {
                res.status(401).send({ message: error.message })
            }
        })
    }
}