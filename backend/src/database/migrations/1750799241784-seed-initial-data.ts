import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class SeedInitialData1750799241784 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
    const passwordHash = await bcrypt.hash("admin123", 10);

    await queryRunner.query(`
      INSERT INTO "roles" (id, name) VALUES
      (1, 'ADMIN'),
      (2, 'COLABORADOR');
    `);

    await queryRunner.query(`
      INSERT INTO "users" (name, email, password, role_id)
      VALUES ('Administrador', 'admin@ipdv.com', '${passwordHash}', 1);
    `);

    await queryRunner.query(`
      INSERT INTO "users" (name, email, password, role_id) VALUES
      ('João da Silva', 'joao@empresa.com', '${passwordHash}', 2),
      ('Maria Oliveira', 'maria@empresa.com', '${passwordHash}', 2),
      ('Carlos Souza', 'carlos@empresa.com', '${passwordHash}', 2);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "users";`);
    await queryRunner.query(`DELETE FROM "roles";`);
  }
}
