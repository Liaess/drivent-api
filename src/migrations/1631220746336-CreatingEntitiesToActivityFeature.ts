import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingEntitiesToActivityFeature1631220746336
implements MigrationInterface
{
  name = "CreatingEntitiesToActivityFeature1631220746336";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE \"locations\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_7cc1c9e3853b94816c094825e74\" PRIMARY KEY (\"id\"))"
    );
    await queryRunner.query(
      "CREATE TABLE \"users_activities\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"activityId\" integer NOT NULL, CONSTRAINT \"PK_00ddd2c4f7ab18bd50d705c3b67\" PRIMARY KEY (\"id\"))"
    );
    await queryRunner.query(
      "CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"date\" TIMESTAMP NOT NULL, \"locationId\" integer NOT NULL, \"beginsAt\" character varying NOT NULL, \"finishesAt\" character varying NOT NULL, \"title\" character varying NOT NULL, \"remainingSeats\" integer NOT NULL, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))"
    );
    await queryRunner.query(
      "ALTER TABLE \"users_activities\" ADD CONSTRAINT \"FK_a7e235e45a529b2e9dbc736c44f\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE \"users_activities\" ADD CONSTRAINT \"FK_901baf50c84bcbbac97771a2c86\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_74b92be5924b9fb1d808b4ffcd4\" FOREIGN KEY (\"locationId\") REFERENCES \"locations\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_74b92be5924b9fb1d808b4ffcd4\""
    );
    await queryRunner.query(
      "ALTER TABLE \"users_activities\" DROP CONSTRAINT \"FK_901baf50c84bcbbac97771a2c86\""
    );
    await queryRunner.query(
      "ALTER TABLE \"users_activities\" DROP CONSTRAINT \"FK_a7e235e45a529b2e9dbc736c44f\""
    );
    await queryRunner.query("DROP TABLE \"activities\"");
    await queryRunner.query("DROP TABLE \"users_activities\"");
    await queryRunner.query("DROP TABLE \"locations\"");
  }
}
