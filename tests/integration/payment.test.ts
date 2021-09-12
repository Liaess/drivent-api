import supertest from "supertest";
import httpStatus from "http-status";
import dayjs from "dayjs";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createSession } from "../factories/loginFactory";
import { createUnpaidTicket, ticketBody } from "../factories/ticketFactory";

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

describe("GET /payment", () => {
  it("should return status OK", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const ticket = await createUnpaidTicket(user);

    const response = await agent.get("/payment").set(headers);

    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should return ticket infos", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const ticket = await createUnpaidTicket(user);

    const response = await agent.get("/payment").set(headers);

    expect(response.body).toEqual(ticket);
  });

  it("should return not found status for inexistent user ticket", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };

    const response = await agent.get("/payment").set(headers);

    expect(response.statusCode).toEqual(httpStatus.NO_CONTENT);
  });

  it("should return unauthorized status for invalid token", async () => {
    const headers = { authorization: `Bearer whateverToken` };

    const response = await agent.get("/payment").set(headers);

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return unauthorized status for unset headers", async () => {
    const response = await agent.get("/payment");

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
});

describe("POST /payment/confirmation", () => {
  it("should return created status", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const body = ticketBody(user, false);
    const { isOnline, hasHotelReservation } = body;

    const response = await agent
      .post("/payment/confirmation")
      .send({ isOnline, hasHotelReservation })
      .set(headers);

    expect(response.statusCode).toEqual(httpStatus.CREATED);
  });

  it("should return new ticket infos ", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const body = ticketBody(user, false);
    const { isOnline, hasHotelReservation } = body;

    const response = await agent
      .post("/payment/confirmation")
      .send({ isOnline, hasHotelReservation })
      .set(headers);

    expect(response.body).toEqual(
      expect.objectContaining({
        ...body,
        id: expect.any(Number),
      })
    );
  });

  it("should return unauthorized status for invalid token", async () => {
    const headers = { authorization: `Bearer whateverToken` };

    const response = await agent
      .post("/payment/confirmation")
      .send({})
      .set(headers);

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return unauthorized status for unset headers", async () => {
    const response = await agent.post("/payment/confirmation").send({}).set({});

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
});

describe("PUT /payment/confirmation", () => {
  it("should return  OK status", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const body = ticketBody(user, true);

    const response = await agent
      .put("/payment/confirmation")
      .send({ ...body, id: user.id })
      .set(headers);

    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should return updated ticket infos", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const body = ticketBody(user, true);

    const response = await agent
      .put("/payment/confirmation")
      .send({ ...body, id: user.id })
      .set(headers);

    expect(response.body).toEqual(
      expect.objectContaining({
        ...body,
        id: expect.any(Number),
      })
    );
  });

  it("should return unauthorized status for invalid token", async () => {
    const headers = { authorization: `Bearer whateverToken` };

    const response = await agent
      .put("/payment/confirmation")
      .send({})
      .set(headers);

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return unauthorized status for unset headers", async () => {
    const response = await agent.put("/payment/confirmation").send({}).set({});

    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
});
