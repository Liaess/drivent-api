import User_Room from "../../src/entities/User_Room";
import { UserRoomData } from "../../src/interfaces/user_room";

export async function createUserRoomRelation(room: number, user: number) {
  const userRoomRelationBody: UserRoomData = {
    roomId: room,
    userId: user
  };
  
  const relation =  User_Room.create(userRoomRelationBody);
  await relation.save();
  return relation;
}
