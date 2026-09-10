import { DataSource } from "typeorm";

// importar a entidade
import { Situations } from "../entity/situations";

export default class CreateSituationsSeeds {
  public async run(dataSource: DataSource): Promise<void> {
    console.log("Iniciando o seed para a tabela situations...");

    // obter o repositorio da entidade
    const situationRepository = dataSource.getRepository(Situations);

    // verificar se a tabela ja possui registros
    const count = await situationRepository.count();

    if (count > 0) {
      console.log(
        "A tabela situations ja possui dados, nenhuma acao foi realizada."
      );
      return;
    }

    // dados padroes da tabela
    const situations = [
      { nameSituation: "Ativo" },
      { nameSituation: "Inativo" },
      { nameSituation: "Pendente" },
    ];

    // salvar os registros no banco de dados
    await situationRepository.save(situations);

    console.log("Situacoes cadastradas com sucesso!");
  }
}
