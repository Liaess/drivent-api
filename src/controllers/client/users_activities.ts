import { Request, Response } from "express";
import httpStatus from "http-status";

import * as usersActivitiesService from "@/services/client/users_activities";

export async function subscription(req: Request, res: Response) {
  const activityInfo = req.body;
  const userId = req.user.id;
  await usersActivitiesService.subscription(userId, activityInfo);
  res.sendStatus(httpStatus.OK);
}
