import { Request, Response } from "express";
import httpStatus from "http-status";

import * as ticketService from "@/services/client/payment";
import TicketData from "@/interfaces/ticket";

export async function getTicketInfos(req: Request, res: Response) {
  const ticketInfo = await ticketService.getTicket(req.user.id);
  
  if(!ticketInfo.isPaid) {
    return res.send(ticketInfo).status(httpStatus.NOT_MODIFIED);
  }

  res.send(ticketInfo).status(httpStatus.OK);
}

export async function savePaymentInfo(req: Request, res: Response) {
  const ticketData = req.body as TicketData;
  ticketData.userId = req.user.id;
  await ticketService.createPayment(ticketData);
  res.sendStatus(httpStatus.OK);
}
