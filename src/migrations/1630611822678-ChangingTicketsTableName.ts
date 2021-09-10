import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangingTicketsTableName1630611822678
implements MigrationInterface
{
  name = "ChangingTicketsTableName1630611822678";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"ticket\" RENAME TO \"tickets\"");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"tickets\" RENAME TO \"ticket\"");
  }
}
