import { Request, Response, NextFunction } from "express";
import { createClient } from "redis";

import jwt from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";

interface JwtPayload {
    userId: number
}

export default async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    let redisClient;
    if(process.env.REDIS_URL) {
      redisClient = createClient({
        socket: {
          url: process.env.REDIS_URL
        }
      });
    } else {
      redisClient = createClient();
    }
    await redisClient.connect();
    
    const authHeader = req.header("Authorization");

    const token = authHeader?.replace("Bearer ", "");
    if (!token) {
      throw new UnauthorizedError();
    } 
  
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const userSession = await redisClient.get(`${userId}`);

    if(userSession !== token) {
      throw new UnauthorizedError();
    }

    req.user = { id: userId };
    next();
  } catch (e) {
    throw new UnauthorizedError();
  }
}
