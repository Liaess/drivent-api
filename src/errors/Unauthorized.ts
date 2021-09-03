export default class UnauthorizedError extends Error {
  constructor() {
    super("You must have something wrong, please check your infomations!");

    this.name = "UnauthorizedError";
  }
}
