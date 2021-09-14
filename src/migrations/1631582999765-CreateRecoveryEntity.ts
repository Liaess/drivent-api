import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRecoveryEntity1631582999765 implements MigrationInterface {
  name = "CreateRecoveryEntity1631582999765";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE \"recoveries\" (\"id\" SERIAL NOT NULL, \"email\" character varying NOT NULL, \"token\" character varying NOT NULL, CONSTRAINT \"PK_7f7fdc38ebfdfdaa075d0ae0a1a\" PRIMARY KEY (\"id\"))"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE \"recoveries\"");
  }
}
