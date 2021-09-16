import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createSession } from "../factories/loginFactory";
import { createActivities } from "../factories/activityFactory";
import { createSubscription } from "../factories/user_activityFactory";

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

describe("post /user_activity/register", () => {
  it("should return status OK", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const activities = await createActivities();
    const body = activities[4];

    const response = await agent
      .post("/user_activity/register")
      .set(headers)
      .send(body);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should return conflict status for user already registered at activity", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const activities = await createActivities();
    const body = activities[4];
    await createSubscription(user.id, body);

    const response = await agent
      .post("/user_activity/register")
      .set(headers)
      .send(body);
    expect(response.statusCode).toEqual(httpStatus.CONFLICT);
  });

  it("should return conflict status for schedule conflict", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const activities = await createActivities();
    const body = activities[4];
    await createSubscription(user.id, activities[3]);

    const response = await agent
      .post("/user_activity/register")
      .set(headers)
      .send(body);
    expect(response.statusCode).toEqual(httpStatus.CONFLICT);
  });

  it("should return unauthorized status for invalid token", async () => {
    const headers = { authorization: `Bearer whateverToken` };

    const response = await agent.post("/user_activity/register").set(headers);

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return unauthorized status for unset headers", async () => {
    const response = await agent.post("/user_activity/register");

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
});
