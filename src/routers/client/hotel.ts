import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/", controller.getHotelsInfo);
router.post("/", controller.saveReservedRoomInfo);
router.get("/rooms", controller.getUserRoomInfo);

export default router;
