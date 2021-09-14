import User_Activity from "@/entities/User_Activity";

export async function subscription(userId: number, activityId: number) {
  return await User_Activity.subscription(userId, activityId);
}
