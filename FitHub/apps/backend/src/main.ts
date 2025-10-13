import dotenv from "dotenv"
dotenv.config();
import express from 'express';
import { db, SenhaCripto, RepositorioUsuarioPG } from '@fit-hub/backendAdapters';
import { RegistrarUsuario, LoginUsuario } from '@fit-hub/core';
import RegistrarUsuarioController from './API/RegistrarUsuarioController';
import LoginUsuarioController from "./API/LoginUsuarioController";


/*
=========================== 
      Iniciar servidor
          Express
=========================== 
*/

const porta = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(porta, () => {
  console.log(`🔥Servidor rodando na porta ${porta} \n 🔥http://localhost:${porta}`);
});

/*
=========================== 
Verificação de Conexão com o
      Banco de Dados
=========================== 
*/

db.connect().then((connection) => {
      console.log("✅ Conectado ao banco de dados PostgreSQL com sucesso!");
      console.log(`📊 Banco: ${process.env.DB_NAME} | Host: ${process.env.DB_HOST}:${process.env.DB_PORT} \n`);
      connection.done(); // Libera a conexão de volta para o pool
  })
  .catch((error) => {
      console.error("❌ Erro ao conectar ao banco de dados PostgreSQL:");
      console.error(error.message);
      console.error("\n🔍 Verifique se:");
      console.error("  - O PostgreSQL está rodando");
      console.error("  - As credenciais no .env estão corretas");
      console.error("  - O banco de dados existe");
      console.error(" === Após aplicar as modificações, reinicie o projeto! === ");
  });
/*
=========================== 
      Adaptadores
=========================== 
*/
const repoUsuario = new RepositorioUsuarioPG()
const provCripto = new SenhaCripto()
const cduRegistrarUsuario = new RegistrarUsuario(repoUsuario, provCripto)

const cduLoginUsuario = new LoginUsuario(repoUsuario, provCripto)
/*
=========================== 
      Rotas Abertas
=========================== 
*/

new RegistrarUsuarioController(app, cduRegistrarUsuario)

new LoginUsuarioController(app, cduLoginUsuario)