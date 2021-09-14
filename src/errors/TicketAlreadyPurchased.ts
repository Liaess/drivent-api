import ConflictError from "@/errors/ConflictError";

export default class UserAlreadySubscripted extends ConflictError {
  constructor() {
    super("That user has already subscribed to the activity!");

    this.name = "UserAlreadySubscripted";
  }
}
