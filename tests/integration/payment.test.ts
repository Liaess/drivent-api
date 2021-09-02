import supertest from "supertest";
import faker from "faker";
import httpStatus from "http-status";
import dayjs from "dayjs";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createUnpaiedTicket } from "../factories/ticketFactory";

const agent =  supertest(app);

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

describe("GET /payment/confirmation", () => {
  it("should return ticket infos with status NOT_MODIFIED", async () => {
    await createUser();
    await createUnpaiedTicket();

    const response = await agent.get("/payment/confirmation");

    expect(response.statusCode).toEqual(httpStatus.NOT_MODIFIED);
    expect(response.body).toEqual(
      expect.objectContaining({
        isOnline: expect.any(Boolean),
        hasHotelReservation: expect.any(Boolean),
        isPaid: expect.any(Boolean),
        userId: expect.any(Number),
      })
    );
  });
});
