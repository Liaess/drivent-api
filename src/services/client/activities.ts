import Activity from "@/entities/Activity";

export async function getAllDates() {
  return await Activity.getAllDates();
}

export async function getActivitiesByDate(date: Date, userId: number) {
  return await Activity.getActivitiesByDate(date, userId);
}
