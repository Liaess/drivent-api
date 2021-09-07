import Hotel from "@/entities/Hotel";

export async function getHotelsWithRooms() {
  return await Hotel.getHotels();
}
