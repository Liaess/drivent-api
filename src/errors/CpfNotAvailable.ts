import ConflictError from "@/errors/ConflictError";

export default class CpfNotAvailableError extends ConflictError {
  constructor(cpf: string) {
    super(`CPF "${cpf}" já está sendo usado por outro usuário!`);

    this.name = "CpfNotAvailable";
  }
}
