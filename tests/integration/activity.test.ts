import supertest from "supertest";
import httpStatus from "http-status";
import dayjs from "dayjs";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createSession } from "../factories/loginFactory";
import { createActivities } from "../factories/activityFactory";

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

    const response = await agent.get("/activity").set(headers);

    expect(response.body.length).toEqual(3);
  });

  it("should return not found status for inexistent activities", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };

    const response = await agent.get("/activity").set(headers);

    expect(response.statusCode).toEqual(httpStatus.NOT_FOUND);
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
