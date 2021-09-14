import { Router } from "express";

import * as controller from "@/controllers/client/users_activities";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import activitySubscriptionSchema from "@/schemas/activitySubscriptionSchema";

const router = Router();

router.post(
  "/register",
  schemaValidatingMiddleware(activitySubscriptionSchema),
  controller.subscription
);

export default router;
