import { Router, Request, Response } from "express";

// importar as credenciais do banco de dados e a entidade
import { AppDataSource } from "../data-source";
import { Situations } from "../entity/situations";

const router = Router();

router.get("/situations", (request: Request, response: Response) => {
  response.send("Tela de situacoes da rota.");
});

// cadastrar situacao
router.post("/situations", async (request: Request, response: Response) => {
  try {
    // receber os dados da requisicao
    var data = request.body;

    // criar uma instancia (repositorio) da entidade no banco de dados
    const situationRepository = AppDataSource.getRepository(Situations);

    // criar o novo registro
    const newSituation = situationRepository.create(data);

    // salvar o registro no banco de dados
    await situationRepository.save(newSituation);

    response.status(201).json({
      message: "Situacao cadastrada com sucesso!",
      situation: newSituation,
    });
  } catch (error) {
    response.status(500).json({
      message: "Erro ao cadastrar a situacao!",
    });
  }
});

export default router;
