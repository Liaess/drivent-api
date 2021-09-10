import { Request, Response } from "express";
import httpStatus from "http-status";

import * as activityService from "@/services/client/activities";

export async function getAllDates(req: Request, res: Response) {
  const allDates = await activityService.getAllDates();

  if (!allDates.length) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  } else {
    res.status(httpStatus.OK).send(allDates);
  }
}

export async function getActivitiesByDate(req: Request, res: Response) {
  const { date } = req.body;
  const activities = await activityService.getActivitiesByDate(new Date(date));

  if (!activities.length) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  } else {
    res.status(httpStatus.OK).send(activities);
  }
}
