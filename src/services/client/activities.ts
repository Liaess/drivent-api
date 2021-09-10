import Activity from "@/entities/Activity";

export async function getAllDates() {
  return await Activity.getAllDates();
}
