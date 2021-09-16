import User_Activity from "@/entities/User_Activity";
import { ActivityInfo } from "@/interfaces/activity";

export async function subscription(userId: number, activityInfo: ActivityInfo) {
  await User_Activity.subscription(userId, activityInfo);
}
