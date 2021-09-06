import { Request, Response } from "express";
import httpStatus from "http-status";

import * as ticketService from "@/services/client/payment";
import { TicketData, TicketDataToUpdate } from "@/interfaces/ticket";

export async function getTicketInfos(req: Request, res: Response) {
  const ticketInfo = await ticketService.getTicket(req.user.id);

  if (ticketInfo === undefined) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  } else {
    res.send(ticketInfo).status(httpStatus.OK);
  }
}

export async function savePaymentInfo(req: Request, res: Response) {
  const ticketData = req.body as TicketData;
  ticketData.userId = req.user.id;
  const savedTicket = await ticketService.createPayment(ticketData);
  res.send(savedTicket).status(httpStatus.CREATED);
}

export async function updatePaymentStatus(req: Request, res: Response) {
  const ticketData = req.body as TicketDataToUpdate;
  const savedTicket = await ticketService.updatePaymentStatus(ticketData);
  res.send(savedTicket).status(httpStatus.OK);
}
