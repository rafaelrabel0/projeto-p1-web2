// importar as credenciais do banco de dados
import { AppDataSource } from "./data-source";

// importar os seeds
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds";

const runSeed = async function () {
  console.log("Conectando ao banco de dados...");

  // inicializar a conexao com o banco de dados
  await AppDataSource.initialize();

  console.log("Conectado ao banco de dados!");

  try {
    // criar a instancia dos seeds
    const situationSeeds = new CreateSituationsSeeds();

    // executar os seeds
    await situationSeeds.run(AppDataSource);
  } catch (error) {
    console.error("Erro ao executar os seeds:", error);
  } finally {
    // encerrar a conexao com o banco de dados
    await AppDataSource.destroy();

    console.log("Conexao com o banco de dados encerrada.");
  }
};

runSeed();
