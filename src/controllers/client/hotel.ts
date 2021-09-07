import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/hotel";

export async function getHotelsInfo(req: Request, res: Response) {
  const hotelsInfo = await hotelService.getHotelsWithRooms();

  if(!hotelsInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(hotelsInfo).status(httpStatus.OK);
}
