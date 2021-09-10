import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRoomsEntity1631148582303 implements MigrationInterface {
    name = "CreateUserRoomsEntity1631148582303"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"users_rooms\" (\"id\" SERIAL NOT NULL, \"roomId\" integer NOT NULL, \"userId\" integer NOT NULL, CONSTRAINT \"PK_395639253b97b5f75a0586c627d\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DROP TABLE \"users_rooms\"");
    }
}
