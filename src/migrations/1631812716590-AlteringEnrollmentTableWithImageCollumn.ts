import { MigrationInterface, QueryRunner } from "typeorm";

export class AlteringEnrollmentTableWithImageCollumn1631812716590 implements MigrationInterface {
    name = "AlteringEnrollmentTableWithImageCollumn1631812716590"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD \"image\" character varying NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP COLUMN \"image\"");
    }
}
