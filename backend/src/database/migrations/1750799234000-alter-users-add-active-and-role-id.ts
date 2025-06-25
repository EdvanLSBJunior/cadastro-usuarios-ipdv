import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AlterUsersAddActiveAndRoleId1750799234000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
          "users",
          new TableColumn({
            name: "active",
            type: "boolean",
            default: true,
          })
        );
    
        await queryRunner.addColumn(
          "users",
          new TableColumn({
            name: "role_id",
            type: "int",
            isNullable: true,
          })
        );
    
        await queryRunner.createForeignKey(
          "users",
          new TableForeignKey({
            columnNames: ["role_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "roles",
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          })
        );
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.includes("role_id"));
        if (foreignKey) {
          await queryRunner.dropForeignKey("users", foreignKey);
        }
    
        await queryRunner.dropColumn("users", "role_id");
        await queryRunner.dropColumn("users", "ativo");
      }

}
