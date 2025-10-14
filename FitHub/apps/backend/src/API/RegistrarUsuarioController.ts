import { Express } from 'express';
import { RegistrarUsuario } from '@fit-hub/core';
import { ProvedorCriptografia } from '@fit-hub/adapters';

export default class RegistrarUsuarioController {
    constructor(
        servidor: Express,
        cdu: RegistrarUsuario,
        provedorCripto: ProvedorCriptografia,
    ) {
        servidor.post('/api/registrar', async (req, resp) => {
            try {
                const senhaCripto = await provedorCripto.criptografar(req.body.senha)
                console.info(`Senha criptografada: ${senhaCripto}`);
                await cdu.executar({
                    nome: req.body.nome,
                    email: req.body.email,
                    senha: senhaCripto,
                    peso: req.body.peso,
                    altura: req.body.altura,
                    idade: req.body.idade,
                    FA: req.body.FA,
                })
                console.info(`Usuário registrado: ${req}`);
                console.info(`Usuário registrado: ${req.body.nome}`);
                console.info(`Usuário registrado: ${req.body.email}`);
                console.info(`Usuário registrado: ${req.body.senha}`);
                console.info(`Usuário registrado: ${req.body.peso}`);
                console.info(`Usuário registrado: ${req.body.altura}`);
                console.info(`Usuário registrado: ${req.body.idade}`);
                resp.status(201).json({ message: 'Usuário registrado com sucesso' });
            } catch (error) {
                resp.status(500).json({ message: 'Erro ao registrar usuário', error });
            }
        })
    }
}