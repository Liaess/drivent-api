import { Router } from "express";

import * as controller from "@/controllers/client/payment";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import ticketSchema from "@/schemas/ticketSchema";
import updatePaymentSchema from "@/schemas/updatePaymentSchema";

const router = Router();

router.get("/", controller.getTicketInfos);
router.post(
  "/confirmation",
  schemaValidatingMiddleware(ticketSchema),
  controller.savePaymentInfo
);
router.put(
  "/confirmation",
  schemaValidatingMiddleware(updatePaymentSchema),
  controller.updatePaymentStatus
);

export default router;
