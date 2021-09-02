import Ticket from "@/entities/Ticket";
import TicketData from "@/interfaces/ticket";

export async function getTicket(userId: number) {
  return await Ticket.getByUserId(userId);
}
  
export async function createPayment(ticketData: TicketData) {
  await Ticket.createOrUpdate(ticketData);  
}
