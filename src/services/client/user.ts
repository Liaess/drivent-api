import dayjs from "dayjs";
import { v4, validate } from "uuid";
import User from "@/entities/User";
import sgMail from "@sendgrid/mail";
import bcrypt from "bcrypt";

import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import Setting from "@/entities/Setting";
import Recovery from "@/entities/Recovery";

export async function createNewUser(email: string, password: string) {
  const settings = await Setting.getEventSettings();

  if (dayjs().isBefore(dayjs(settings.startDate))) {
    throw new CannotEnrollBeforeStartDateError();
  }

  const user = await User.createNew(email, password);
  return user;
}

export function createToken() {
  const token = v4();
  return token;
}

export async function findUserByEmail(email: string) {
  return await User.findUserByEmail(email);
}

export async function sendEmail(email: string, token: string) {
  const isValid = validate(token);
  let wasSent = false;
  if (isValid) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${email}`,
      from: "yann.melo@gmail.com", // Use the email address or domain you verified above
      subject: "Redefina sua senha - DRIVENT",
      text: "and easy to do anywhere, even with Node.js",
      html: `<strong>REDEFINA SUA SENHA EM: <a href=${process.env.FRONTEND_URL + "/redefine/" + token} >${
        process.env.FRONTEND_URL + "/redefine/" + token
      }</a></strong>`,
    };
    sgMail.send(msg).then(
      () => {
        wasSent = true;
      },
      (error) => {
        console.error(error);

        if (error.response) {
          console.error(error.response.body);
        }
      }
    );
  }

  return wasSent;
}

export async function updatePassword(email: string, password: string) {
  const hash = bcrypt.hashSync(password, 10);
  await User.update({ email }, { password: hash });
}

export async function getEmail(token: string) {
  const { email } = await Recovery.findOne({
    where: { token },
  });
  return email;
}

export async function insertRecovery(email: string, token: string) {
  await Recovery.insert({ email, token });
}

export async function deleteRecovery(email: string) {
  await Recovery.delete({ email });
}
