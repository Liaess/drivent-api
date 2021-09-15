import jwt from "jsonwebtoken";
import { createClient } from "redis";

import UnauthorizedError from "@/errors/Unauthorized";
import User from "@/entities/User";

export async function signIn(email: string, password: string) {
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

  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new UnauthorizedError();
  }

  const data = await redisClient.get(`${user.id}`);

  if(data !== null) { 
    const token = data;
    return {
      user: {
        id: user.id,
        email: user.email
      },
      token
    };
  } else {
    const token = jwt.sign({
      userId: user.id
    }, process.env.JWT_SECRET);
    
    await redisClient.set(`${user.id}`, token);

    return {
      user: {
        id: user.id,
        email: user.email
      },
      token
    };
  }
}
