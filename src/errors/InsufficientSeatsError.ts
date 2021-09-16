export default class InsufficientSeatsError extends Error {
  constructor() {
    super("Cannot remove seats from zero quantity!");

    this.name = "InsufficientSeatsError";
  }
}
