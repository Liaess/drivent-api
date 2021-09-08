import Ticket from "../../src/entities/Ticket";
import User from "../../src/entities/User";
import { TicketData } from "../../src/interfaces/ticket";

export function ticketBody(user: User, isPaid: boolean) {
  const ticket: TicketData = {
    isOnline: false,
    hasHotelReservation: false,
    isPaid,
    userId: user.id,
  };
  return ticket;
}

export async function createUnpaidTicket(user: User) {
  const ticket = Ticket.create(ticketBody(user, false));
  await ticket.save();
  return ticket;
}

export async function createPaidTicket(user: User) {
  const ticket = Ticket.create(ticketBody(user, true));
  await ticket.save();
  return ticket;
}
