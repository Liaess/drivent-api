import { Router } from "express";
import multer from "multer";
import multerConfig from "../../config/multer";

import * as controller from "@/controllers/client/enrollment";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import enrollmentSchema from "@/schemas/enrollmentSchema";

const router = Router();

router.post("/", schemaValidatingMiddleware(enrollmentSchema), controller.saveEnrollmentInfo);
router.post("/image", multer(multerConfig).single("file"), controller.saveEnrollmentImage);
router.get("/", controller.getEnrollmentInfos);

export default router;
