import Session from "../../src/entities/Session";
import User from "../../src/entities/User";
import jwt from "jsonwebtoken";

export async function createSession(user: User) {
  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET
  );

  const session = Session.create({
    userId: user.id,
    token,
  });

  await session.save();
  return session;
}
