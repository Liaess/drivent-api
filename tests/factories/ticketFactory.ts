import Ticket from "../../src/entities/Ticket";

export async function createUnpaiedTicket() {
  const ticket = Ticket.create({
    isOnline: false,
    hasHotelReservation: false,
    isPaid: false
  });
  return ticket;
}

export async function createPaiedTicket() {
  const ticket = Ticket.create({
    isOnline: false,
    hasHotelReservation: false,
    isPaid: false
  });
  return ticket;
}
