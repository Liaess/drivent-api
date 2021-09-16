import { Request, Response } from "express";
import httpStatus from "http-status";

import * as enrollmentService from "@/services/client/enrollment";
import EnrollmentData from "@/interfaces/enrollment";

export async function saveEnrollmentInfo(req: Request, res: Response) {
  const enrollmentData = req.body as EnrollmentData;
  enrollmentData.userId = req.user.id;
  await enrollmentService.createNewEnrollment(enrollmentData);
  res.sendStatus(httpStatus.OK);
}

export async function saveEnrollmentImage(req: Request, res: Response) {
  const file = req.file as Express.MulterS3.File;
  const id = req.user.id;
  await enrollmentService.createNewEnrollmentImage(id, file);
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(id);
  res.send(enrollmentInfo).status(httpStatus.OK);
}

export async function getEnrollmentInfos(req: Request, res: Response) {
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(req.user.id);

  if(!enrollmentInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(enrollmentInfo).status(httpStatus.OK);
}
