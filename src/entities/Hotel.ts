import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Room from "@/entities/Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column()
  roomTypes: string;

  @OneToMany(() => Room, (room) => room.hotel)
  rooms: Room[];

  static async getHotels() {
    return await this.createQueryBuilder("hotels")
      .innerJoinAndSelect("hotels.rooms", "rooms")
      .orderBy("rooms.id", "ASC")
      .getMany();
  }
}
