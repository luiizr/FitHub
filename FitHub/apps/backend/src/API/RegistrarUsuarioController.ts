import { Express } from 'express';
import { RegistrarUsuario } from '@fit-hub/core';

export default class RegistrarUsuarioController {
    constructor(
        servidor: Express,
        cdu: RegistrarUsuario
    ) {
        servidor.post('/api/registrar', async (req, resp) => {
            try {
                await cdu.executar({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: req.body.senha,
                    peso: req.body.peso,
                    altura: req.body.altura,
                    idade: req.body.idade,
                    FA: req.body.FA,
                })
                resp.status(201).json({ message: 'Usuário registrado com sucesso' });
            } catch (error) {
                resp.status(500).json({ message: 'Erro ao registrar usuário', error });
            }
        })
    }
}