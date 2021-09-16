export default class CannotUpdateNotFoundActivity extends Error {
  constructor() {
    super("It's impossible update not found activities!");

    this.name = "CannotUpdateNotFoundActivity";
  }
}
