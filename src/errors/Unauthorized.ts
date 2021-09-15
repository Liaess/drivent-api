export default class UnauthorizedError extends Error {
  constructor() {
    super("Você deve ter digitado algo errado, por favor confira os dados!");

    this.name = "UnauthorizedError";
  }
}
