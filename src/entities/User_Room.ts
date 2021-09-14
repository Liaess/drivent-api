import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";

import Room from "@/entities/Room";
import User from "@/entities/User";
import { UserRoomData } from "@/interfaces/user_room";

@Entity("users_rooms")
export default class User_Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomId: number;

  @Column()
  userId: number;

  @OneToOne(() => Room, (room) => room)
  @JoinColumn()
  room: Room;

  @OneToOne(() => User, (user) => user)
  @JoinColumn()
  user: User;

  populateFromData(data: UserRoomData) {
    this.userId = data.userId;
    this.roomId = data.roomId;
  }

  static async createOrUpdate(data: UserRoomData) {
    let userRoom = await this.findOne({ where: { userId: data.userId } });
    if (userRoom) {
      await this.createQueryBuilder()
        .update(Room)
        .set({ available: () => "available + 1" })
        .where("id = :id", { id: userRoom.roomId })
        .execute();
    }

    userRoom ||= User_Room.create();
    userRoom.populateFromData(data);
    await userRoom.save();

    await this.createQueryBuilder()
      .update(Room)
      .set({ available: () => "available - 1" })
      .where("id = :id", { id: data.roomId })
      .execute();
  }

  static async getRoomAndHotelInfo(data: UserRoomData) {
    return await this.find({ where: { userId: data.userId }, relations: ["room", "room.hotel"] });
  }
}
