import ConflictError from "@/errors/ConflictError";

export default class EmailNotAvailableError extends ConflictError {
  constructor(email: string) {
    super(`Email "${email}" já está sendo usado por outro usuário!`);

    this.name = "EmailNotAvailableError";
  }
}
