import { Usuario, RepositorioUsuario } from '@fit-hub/core';
import db from './db';

export default class RepositorioUsuarioPG implements RepositorioUsuario {
    async CalcularKcal(usuario: Usuario): Promise<Usuario> {
        throw new Error('Method not implemented.');
    }


    async RegistrarUsuario(usuario: Usuario): Promise<void> {
        await db.query(
            "INSERT INTO usuarios (id, nome, email, senha, peso, altura, idade) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [usuario.id, usuario.nome, usuario.email, usuario.senha, usuario.peso, usuario.altura, usuario.idade]
        )
    }
    async BuscarUsuarioPorEmail(email: string): Promise<Usuario | null> {
        const result = await db.oneOrNone(
            "SELECT * FROM usuarios WHERE email = $1",
            [email]
        );
        return result;
    }
    async BuscarUsuarioPorId(id: string): Promise<Usuario | null> {
        const result = await db.oneOrNone(
            "SELECT * FROM usuarios WHERE id = $1",
            [id]
        );
        return result;
    }

}