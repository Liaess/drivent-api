import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/user";
import Recovery from "@/entities/Recovery";

export async function signUp(req: Request, res: Response) {
  const user = await service.createNewUser(req.body.email, req.body.password);
  res.status(httpStatus.CREATED).send(user);
}

export async function sendEmail(req: Request, res: Response) {
  const { email } = req.body as { email: string };
  const token = service.createToken();
  const checkEmail = await service.findUserByEmail(email);
  if (checkEmail) {
    await Recovery.insert({ email, token });
    service.sendEmail(email, token);
    res.sendStatus(httpStatus.OK);
  } else {
    res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function updatePassword(req: Request, res: Response) {
  const { password } = req.body as { password: string };
  const token = req.headers.authorization.replace("Bearer ", "");
  if (!token || !password) {
    res.sendStatus(httpStatus.BAD_REQUEST);
  } else {
    const { email } = await Recovery.findOne({
      where: { token },
    });
    if (email) {
      await service.updatePassword(email, password);
      await Recovery.delete({ email });
    }
    res.sendStatus(httpStatus.OK);
  }
}
