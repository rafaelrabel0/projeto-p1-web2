// importar variaveis de ambiente
import dotenv from "dotenv";
dotenv.config();

import express from "express";

// importar as credenciais do banco de dados
import { AppDataSource } from "./data-source";

// incluir os controllers
import authController from "./controllers/AuthController";
import situationsController from "./controllers/SituationsController";

// inicializar a conexao com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log("Conexao com o banco de dados realizada com sucesso");
  })
  .catch((error) => {
    console.error("Erro na conexao com o banco de dados:", error);
  });

const app = express();

// midware para receber os dados no corpo da requisicao
app.use(express.json());

// criar as rotas
app.use("/", authController);
app.use("/", situationsController);

const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}: http://localhost:${port}`);
});
