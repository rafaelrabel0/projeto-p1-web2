import { Router, Request, Response } from "express";

// importar as credenciais do banco de dados e a entidade
import { AppDataSource } from "../data-source";
import { Situations } from "../entity/situations";

const router = Router();

// listar as situacoes
router.get("/situations", async (request: Request, response: Response) => {
  try {
    // obter o repositorio da entidade
    const situationRepository = AppDataSource.getRepository(Situations);

    // recuperar todas as situacoes do banco de dados
    const situations = await situationRepository.find();

    response.status(200).json(situations);
    return;
  } catch (error) {
    response.status(500).json({
      message: "Erro ao listar as situacoes!",
    });
    return;
  }
});

// visualizar uma situacao cadastrada
router.get(
  "/situations/:id",
  async (request: Request<{ id: string }>, response: Response) => {
    try {
      // obter o id da situacao
      const { id } = request.params;

      // obter o repositorio da entidade
      const situationRepository = AppDataSource.getRepository(Situations);

      // buscar a situacao pelo id
      const situation = await situationRepository.findOneBy({
        id: parseInt(id),
      });

      // situacao nao encontrada
      if (!situation) {
        response.status(404).json({
          message: "Situacao nao encontrada!",
        });
        return;
      }

      response.status(200).json(situation);
      return;
    } catch (error) {
      response.status(500).json({
        message: "Erro ao visualizar a situacao!",
      });
      return;
    }
  }
);

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
    return;
  } catch (error) {
    response.status(500).json({
      message: "Erro ao cadastrar a situacao!",
    });
    return;
  }
});

// editar situacao
router.put(
  "/situations/:id",
  async (request: Request<{ id: string }>, response: Response) => {
    try {
      // obter o id da situacao
      const { id } = request.params;

      // receber os dados enviados no corpo da requisicao
      var data = request.body;

      // obter o repositorio da entidade
      const situationRepository = AppDataSource.getRepository(Situations);

      // buscar a situacao pelo id
      const situation = await situationRepository.findOneBy({
        id: parseInt(id),
      });

      // situacao nao encontrada
      if (!situation) {
        response.status(404).json({
          message: "Situacao nao encontrada!",
        });
        return;
      }

      // atualizar os dados da situacao
      situationRepository.merge(situation, data);

      // salvar as alteracoes no banco de dados
      const updateSituation = await situationRepository.save(situation);

      response.status(200).json({
        message: "Situacao atualizada com sucesso!",
        situation: updateSituation,
      });
      return;
    } catch (error) {
      response.status(500).json({
        message: "Erro ao atualizar a situacao!",
      });
      return;
    }
  }
);

export default router;
