import Activity from "@/entities/Activity";

export async function getAllDates() {
  return await Activity.getAllDates();
}

export async function getActivitiesByDate(date: Date) {
  return await Activity.getActivitiesByDate(date);
}
