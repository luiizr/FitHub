import { Express } from 'express';
import { ColecaoUsuario, ProvedorCriptografia } from '@fit-hub/adapters';
import { LoginUsuario } from '@fit-hub/core';
import { Jwt } from '@fit-hub/backendAdapters';

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
                const provedorJwt = new Jwt(process.env.JWT_SECRET)
                
                res.status(200).send({ 
                    token: provedorJwt.gerar({
                        id: usuarioExiste.id, 
                        email: usuarioExiste.email 
                    })
                })
            } catch (error) {
                res.status(401).send({ message: error.message })
            }
        })
    }
}