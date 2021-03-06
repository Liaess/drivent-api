import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import hotelRouter from "@/routers/client/hotel";
import paymentRouter from "@/routers/client/payment";
import activityRouter from "@/routers/client/activities";
import users_activities from "@/routers/client/users_activities";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/hotels", tokenValidationMiddleware, hotelRouter);
router.use("/payment", tokenValidationMiddleware, paymentRouter);
router.use("/activity", tokenValidationMiddleware, activityRouter);
router.use("/user_activity", tokenValidationMiddleware, users_activities);

export default router;
