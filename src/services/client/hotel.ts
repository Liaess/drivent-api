import Hotel from "@/entities/Hotel";
import User_Room from "@/entities/User_Room";
import { UserRoomData } from "@/interfaces/user_room";

export async function getHotelsWithRooms() {
  const hotels = await Hotel.getHotels();
  return hotels;
}

export async function createReserve(userRoomData: UserRoomData) {
  const reserve = await User_Room.createOrUpdate(userRoomData);
  return reserve;
}

export async function getUserRoomAndHotelInfo(userRoomData: UserRoomData) {
  const rooms = await User_Room.getRoomAndHotelInfo(userRoomData);
  return rooms;
}
