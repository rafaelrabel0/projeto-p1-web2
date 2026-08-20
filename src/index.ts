// importar variaveis de ambiente
import dotenv from "dotenv";
dotenv.config();

import express from "express";

// incluir os controllers
import login from "./controllers/login";

const app = express();

app.use(express.json());

// criar as rotas
app.use("/", login);

const port = process.env.PORT ? parseInt(process.env.PORT) : 8080;

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}: http://localhost:${port}`);
});
