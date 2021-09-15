import ConflictError from "@/errors/ConflictError";

export default class ScheduleConflictError extends ConflictError {
  constructor() {
    super("Schedule conflict! Choose another activity.");

    this.name = "ScheduleConflictError";
  }
}
