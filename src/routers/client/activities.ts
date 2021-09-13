import { Router } from "express";

import * as controller from "@/controllers/client/activities";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import activityByDateSchema from "@/schemas/activityByDateSchema";

const router = Router();

router.get("/", controller.getAllDates);
router.post(
  "/",
  schemaValidatingMiddleware(activityByDateSchema),
  controller.getActivitiesByDate
);

export default router;
