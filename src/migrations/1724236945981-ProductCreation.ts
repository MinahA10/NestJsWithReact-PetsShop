import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProductCreation1724236945981 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "product",
        columns: [
          {
            name: "id",
            type: "char",
            length: "36",
            isPrimary: true,
            default: `'UUID()'`,
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true,
            length: "255",
          },
          {
            name: "description",
            type: "varchar",
            length: "255",
          },
          {
            name: "price",
            type: "Decimal",
          },
          {
            name: "picture",
            type: "varchar",
            length: "255",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
