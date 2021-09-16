import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizingTypesOfActivityAndUserActivity1631644773636
implements MigrationInterface
{
  name = "AtualizingTypesOfActivityAndUserActivity1631644773636";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"beginsAt\"");
    await queryRunner.query(
      "ALTER TABLE \"activities\" ADD \"beginsAt\" integer NOT NULL"
    );
    await queryRunner.query(
      "ALTER TABLE \"activities\" DROP COLUMN \"finishesAt\""
    );
    await queryRunner.query(
      "ALTER TABLE \"activities\" ADD \"finishesAt\" integer NOT NULL"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"activities\" DROP COLUMN \"finishesAt\""
    );
    await queryRunner.query(
      "ALTER TABLE \"activities\" ADD \"finishesAt\" character varying NOT NULL"
    );
    await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"beginsAt\"");
    await queryRunner.query(
      "ALTER TABLE \"activities\" ADD \"beginsAt\" character varying NOT NULL"
    );
  }
}
