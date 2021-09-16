import { MigrationInterface, QueryRunner } from "typeorm";

export class AllowingImageCollumnToBeDefaultNull1631815462231 implements MigrationInterface {
    name = "AllowingImageCollumnToBeDefaultNull1631815462231"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" ALTER COLUMN \"image\" DROP NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" ALTER COLUMN \"image\" SET NOT NULL");
    }
}
