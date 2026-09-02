import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableSituations1788363640438 implements MigrationInterface {
  // criar a tabela
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "situations",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "nameSituation",
            type: "varchar",
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
  }

  // rollback: apagar a tabela
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("situations");
  }
}
