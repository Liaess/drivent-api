import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Hotel from "@/entities/Hotel";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  type: string;

  @Column()
  maxCapacity: number;

  @Column()
  available: number;

  @Column()
  hotelId: number;

  @ManyToOne(() => Hotel, hotel => hotel.rooms)
  hotel: Hotel;
}
