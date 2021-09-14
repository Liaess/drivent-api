import ConflictError from "@/errors/ConflictError";

export default class TicketAlreadyPurchasedError extends ConflictError {
  constructor() {
    super("That user has already bought a ticket to the event!");

    this.name = "TicketAlreadyPurchased";
  }
}
