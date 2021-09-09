import Hotel from "@/entities/Hotel";
import User_Room from "@/entities/User_Room";
import { UserRoomData } from "@/interfaces/user_room";

export async function getHotelsWithRooms() {
  return await Hotel.getHotels();
}

export async function createReserve(userRoomData: UserRoomData) {
  const reserve = await User_Room.createOrUpdate(userRoomData);
  return reserve;
}
