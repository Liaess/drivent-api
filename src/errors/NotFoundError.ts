export default class NotFoundError extends Error {
  constructor() {
    super("Nenhum resultado encontrado para essa pesquisa!");

    this.name = "NotFoundError";
  }
}
