import { Router } from "express";

import * as controller from "@/controllers/client/payment";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import ticketSchema from "@/schemas/ticketSchema";

const router = Router();

router.get("/", controller.getTicketInfos);
router.post("/confirmation", schemaValidatingMiddleware(ticketSchema), controller.savePaymentInfo);

export default router;
