import Hotel from "../../src/entities/Hotel";
import HotelData from "../../src/interfaces/hotel";

export async function createHotel() {
  const hotelBody: HotelData = {
    name: "drivent",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg",
    roomTypes: "single",
  };

  const hotel =  Hotel.create(hotelBody);
  await hotel.save();
  return hotel;
}
