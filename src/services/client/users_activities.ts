import User_Activity from "@/entities/User_Activity";
import { ActivityInfo } from "@/interfaces/activity";

export async function subscription(userId: number, activityInfo: ActivityInfo) {
  return await User_Activity.subscription(userId, activityInfo);
}
