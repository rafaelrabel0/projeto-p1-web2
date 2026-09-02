import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableUsers1788363642066 implements MigrationInterface {
  // criar a tabela
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "situationId",
            type: "int",
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );

    // criar chave estrangeira
    await queryRunner.createForeignKey(
      "users",
      new TableForeignKey({
        columnNames: ["situationId"],
        referencedColumnNames: ["id"],
        referencedTableName: "situations",
        onDelete: "CASCADE",
      })
    );
  }

  // rollback: apagar a chave estrangeira e a tabela
  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("users");

    const foreignKey = table?.foreignKeys.find(
      (foreignKey) => foreignKey.columnNames.indexOf("situationId") !== -1
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey("users", foreignKey);
    }

    await queryRunner.dropTable("users");
  }
}
