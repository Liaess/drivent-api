import { Request, Response } from "express";
import httpStatus from "http-status";

import * as ticketService from "@/services/client/payment";
import { TicketData, TicketDataToUpdate } from "@/interfaces/ticket";

export async function getTicketInfos(req: Request, res: Response) {
  const ticketInfo = await ticketService.getTicket(req.user.id);

  if (ticketInfo === undefined) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  } else {
    res.status(httpStatus.OK).send(ticketInfo);
  }
}

export async function savePaymentInfo(req: Request, res: Response) {
  const ticketData = req.body as TicketData;
  ticketData.userId = req.user.id;
  const savedTicket = await ticketService.createPayment(ticketData);
  res.status(httpStatus.CREATED).send(savedTicket);
}

export async function updatePaymentStatus(req: Request, res: Response) {
  const ticketData = req.body as TicketDataToUpdate;
  const savedTicket = await ticketService.updatePaymentStatus(ticketData);
  res.status(httpStatus.OK).send(savedTicket);
}
