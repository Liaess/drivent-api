import User_Activity from "../../src/entities/User_Activity";
import { ActivityInfo } from "../../src/interfaces/activity";

export async function createSubscription(
  userId: number,
  activityInfo: ActivityInfo
) {
  const subscription = User_Activity.create();
  subscription.userId = userId;
  subscription.activityId = activityInfo.id;
  await subscription.save();
}
