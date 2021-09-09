import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserRoomsEntity1631148582303 implements MigrationInterface {
    name = "CreateUserRoomsEntity1631148582303"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"users_rooms\" (\"id\" SERIAL NOT NULL, \"roomId\" integer NOT NULL, \"userId\" integer NOT NULL, CONSTRAINT \"PK_395639253b97b5f75a0586c627d\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE SEQUENCE \"tickets_id_seq\" OWNED BY \"tickets\".\"id\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"id\" SET DEFAULT nextval('tickets_id_seq')");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"id\" DROP DEFAULT");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"id\" SET DEFAULT nextval('ticket_id_seq')");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"id\" DROP DEFAULT");
      await queryRunner.query("DROP SEQUENCE \"tickets_id_seq\"");
      await queryRunner.query("DROP TABLE \"users_rooms\"");
    }
}
