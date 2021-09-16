export default class CannotEnrollBeforeStartDateError extends Error {
  constructor() {
    super("Não é possivel se cadastrar antes do evento ter começado!");

    this.name = "CannotEnrollBeforeStartDateError";
  }
}
