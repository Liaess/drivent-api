import supertest from "supertest";
import httpStatus from "http-status";
import dayjs from "dayjs";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createSession } from "../factories/loginFactory";
import {
  createActivities,
  dateWithMultiActivities,
} from "../factories/activityFactory";
import Activity from "../../src/entities/Activity";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /activity", () => {
  it("should return status OK", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    await createActivities();

    const response = await agent.get("/activity").set(headers);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should return all distinct dates", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    await createActivities();
    const distinctDates = await Activity.createQueryBuilder("activities")
      .select("date")
      .distinct(true)
      .orderBy("date", "ASC")
      .getRawMany();

    const response = await agent.get("/activity").set(headers);

    expect(response.body.length).toEqual(distinctDates.length);
  });

  it("should return not found status for inexistent activities", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };

    const response = await agent.get("/activity").set(headers);

    expect(response.statusCode).toEqual(httpStatus.NO_CONTENT);
  });

  it("should return unauthorized status for invalid token", async () => {
    const headers = { authorization: `Bearer whateverToken` };

    const response = await agent.get("/activity").set(headers);

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return unauthorized status for unset headers", async () => {
    const response = await agent.get("/activity");

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
});

describe("POST /activity", () => {
  it("should return status OK", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    await createActivities();
    const date = dateWithMultiActivities();

    const response = await agent.post("/activity").send({ date }).set(headers);

    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should return all activities in a date", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    await createActivities();
    const date = dateWithMultiActivities();
    const activitiesByDate = await Activity.find({ where: { date } });

    const response = await agent.post("/activity").send({ date }).set(headers);

    expect(response.body.length).toEqual(activitiesByDate.length);
  });

  it("should return not found status for inexistent activities", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const date = dateWithMultiActivities();

    const response = await agent.post("/activity").send({ date }).set(headers);

    expect(response.statusCode).toEqual(httpStatus.NO_CONTENT);
  });

  it("should return unauthorized status for invalid token", async () => {
    const headers = { authorization: `Bearer whateverToken` };

    const response = await agent.post("/activity").set(headers);

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return unauthorized status for unset headers", async () => {
    const response = await agent.post("/activity");

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
});
