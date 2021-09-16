import Ticket from "@/entities/Ticket";
import { TicketData } from "@/interfaces/ticket";

export async function getTicket(userId: number) {
  return await Ticket.getByUserId(userId);
}

export async function createPayment(ticketData: TicketData) {
  return await Ticket.createOrUpdate(ticketData);
}

export async function updatePaymentStatus(ticketData: TicketData) {
  return await Ticket.createOrUpdate(ticketData);
}
