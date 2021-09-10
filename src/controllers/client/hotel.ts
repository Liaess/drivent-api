import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/hotel";
import { UserRoomData } from "@/interfaces/user_room";

export async function getHotelsInfo(_req: Request, res: Response) {
  const hotelsInfo = await hotelService.getHotelsWithRooms();

  if (!hotelsInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(hotelsInfo).status(httpStatus.OK);
}

export async function saveReservedRoomInfo(req: Request, res: Response) {
  const userRoomData = req.body as UserRoomData;
  userRoomData.userId = req.user.id;
  const savedRoom = await hotelService.createReserve(userRoomData);
  res.status(httpStatus.CREATED).send(savedRoom);
}

export async function getUserRoomInfo(req: Request, res: Response) {
  const userRoomData = req.body as UserRoomData;
  userRoomData.userId = req.user.id;
  const savedRoomAndHotelInfo = await hotelService.getUserRoomAndHotelInfo(userRoomData);
  res.status(httpStatus.OK).send(savedRoomAndHotelInfo);
}
