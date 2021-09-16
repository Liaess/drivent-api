import ConflictError from "@/errors/ConflictError";

export default class UserAlreadySubscripted extends ConflictError {
  constructor() {
    super("O usuário já possui um ticket comprado para esse evento!");

    this.name = "UserAlreadySubscripted";
  }
}
