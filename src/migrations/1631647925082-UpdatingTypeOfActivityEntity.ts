import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatingTypeOfActivityEntity1631647925082 implements MigrationInterface {
    name = "UpdatingTypeOfActivityEntity1631647925082"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"beginsAt\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"beginsAt\" TIME WITH TIME ZONE NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"finishesAt\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"finishesAt\" TIME WITH TIME ZONE NOT NULL");
      await queryRunner.query("ALTER TABLE \"users_rooms\" ADD CONSTRAINT \"UQ_16fd42f8cbc9462cc4d6e9bb69b\" UNIQUE (\"roomId\")");
      await queryRunner.query("ALTER TABLE \"users_rooms\" ADD CONSTRAINT \"UQ_d8f6bf18c88e674e89d77c8c67d\" UNIQUE (\"userId\")");
      await queryRunner.query("ALTER TABLE \"users_rooms\" ADD CONSTRAINT \"FK_16fd42f8cbc9462cc4d6e9bb69b\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"users_rooms\" ADD CONSTRAINT \"FK_d8f6bf18c88e674e89d77c8c67d\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"users_rooms\" DROP CONSTRAINT \"FK_d8f6bf18c88e674e89d77c8c67d\"");
      await queryRunner.query("ALTER TABLE \"users_rooms\" DROP CONSTRAINT \"FK_16fd42f8cbc9462cc4d6e9bb69b\"");
      await queryRunner.query("ALTER TABLE \"users_rooms\" DROP CONSTRAINT \"UQ_d8f6bf18c88e674e89d77c8c67d\"");
      await queryRunner.query("ALTER TABLE \"users_rooms\" DROP CONSTRAINT \"UQ_16fd42f8cbc9462cc4d6e9bb69b\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"finishesAt\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"finishesAt\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"beginsAt\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"beginsAt\" integer NOT NULL");
    }
}
