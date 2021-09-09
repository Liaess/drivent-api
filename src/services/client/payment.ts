import Ticket from "@/entities/Ticket";
import { TicketData } from "@/interfaces/ticket";

export async function getTicket(userId: number) {
  return await Ticket.getByUserId(userId);
}

export async function createPayment(ticketData: TicketData) {
  const ticket = await Ticket.createOrUpdate(ticketData);
  return ticket;
}

export async function updatePaymentStatus(ticketData: TicketData) {
  const ticket = await Ticket.createOrUpdate(ticketData);
  return ticket;
}
