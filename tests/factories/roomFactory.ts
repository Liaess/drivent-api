import Room from "../../src/entities/Room";
import RoomData from "../../src/interfaces/room";

export async function createRoom(id: number) {
  const roomBody: RoomData = {
    number: "101",
    type: "single",
    maxCapacity: 1,
    available: 1,
    hotelId: id
  };

  const room =  Room.create(roomBody);
  await room.save();
  return room;
}
