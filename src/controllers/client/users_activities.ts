import { Request, Response } from "express";
import httpStatus from "http-status";

import * as usersActivitiesService from "@/services/client/users_activities";

export async function subscription(req: Request, res: Response) {
  const { activityId } = req.body;
  const userId = req.user.id;
  const remainingSeats = await usersActivitiesService.subscription(
    userId,
    activityId
  );
    // eslint-disable-next-line no-console
  console.log("controller", remainingSeats);

  res.status(httpStatus.OK).send({ remainingSeats });
}
