import { AppDataSource } from "../config/data-source";

AppDataSource.initialize()
  .then(async () => {
    await AppDataSource.runMigrations();
    console.log("Migrations rodadas com sucesso.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Erro ao rodar migrations:", err);
    process.exit(1);
  });
