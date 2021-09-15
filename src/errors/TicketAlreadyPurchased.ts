import ConflictError from "@/errors/ConflictError";

export default class TicketAlreadyPurchasedError extends ConflictError {
  constructor() {
    super("O usuário já possui um ticket comprado para esse evento!");

    this.name = "TicketAlreadyPurchased";
  }
}
