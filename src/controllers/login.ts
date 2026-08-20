import { Router, Request, Response } from "express";

// importar o arquivo com as credenciais do banco de dados
import { AppDataSource } from "../data-source";

const router = Router();

router.get("/", (request: Request, response: Response) => {
  response.send("Bem-vindo, pessoal! Tela de login da rota.");
});

// inicializar a conexao com o banco de dados
AppDataSource.initialize()
  .then(() => {
    console.log("Conexao com o banco de dados realizada com sucesso");
  })
  .catch((error) => {
    console.error("Erro na conexao com o banco de dados:", error);
  });

export default router;
