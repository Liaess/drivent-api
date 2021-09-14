import { Router } from "express";

import * as controller from "@/controllers/client/user";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import createNewUserSchema from "@/schemas/createNewUser";

const router = Router();

router.post(
  "/",
  schemaValidatingMiddleware(createNewUserSchema),
  controller.signUp
);
router.post("/redefine", controller.sendEmail);
router.put("/redefine", controller.updatePassword);

export default router;
