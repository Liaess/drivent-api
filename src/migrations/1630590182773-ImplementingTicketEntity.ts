import { MigrationInterface, QueryRunner } from "typeorm";

export class ImplementingTicketEntity1630590182773 implements MigrationInterface {
    name = "ImplementingTicketEntity1630590182773"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"ticket\" (\"id\" SERIAL NOT NULL, \"isOnline\" boolean NOT NULL, \"hasHotelReservation\" boolean NOT NULL, \"isPaid\" boolean NOT NULL DEFAULT false, \"userId\" integer NOT NULL, CONSTRAINT \"PK_d9a0835407701eb86f874474b7c\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DROP TABLE \"ticket\"");
    }
}
