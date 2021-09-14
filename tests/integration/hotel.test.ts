import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";

import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import { createSession } from "../factories/loginFactory";
import { createHotel } from "../factories/hotelFactory";
import { createRoom } from "../factories/roomFactory";
import { createUserRoomRelation } from "../factories/user_roomFactory";

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

describe("GET /hotels", () => {
  it("should return status OK", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const hotel = await createHotel();
    await createRoom(hotel.id);
    
    const response = await agent.get("/hotels").set(headers);

    expect(response.statusCode).toEqual(httpStatus.OK);
  });

  it("should return array", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const hotel = await createHotel();
    await createRoom(hotel.id);

    const response = await agent.get("/hotels").set(headers);

    expect(response.body.length).not.toBe(0);
  });
});

describe("POTS /hotels", () => {
  it("should return status CREATED", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const hotel = await createHotel();
    const room = await createRoom(hotel.id);
    await createUserRoomRelation(room.id, user.id);
        
    const response = await agent.post("/hotels").send("1").set(headers);
        
    expect(response.statusCode).toEqual(httpStatus.CREATED);
  });

  it("should return array", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const hotel = await createHotel();
    const room = await createRoom(hotel.id);
    await createUserRoomRelation(room.id, user.id);
        
    const response = await agent.post("/hotels").send("1").set(headers);
        
    expect(response.body.length).not.toBe(0);
  });
});

describe("GET /hotels/rooms", () => {
  it("should return status OK", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const hotel = await createHotel();
    await createRoom(hotel.id);

    const response = await agent.get("/hotels").set(headers);
    
    expect(response.statusCode).toEqual(httpStatus.OK);
  });
    
  it("should return array", async () => {
    const user = await createUser();
    const session = await createSession(user);
    const headers = { authorization: `Bearer ${session.token}` };
    const hotel = await createHotel();
    await createRoom(hotel.id);
    
    const response = await agent.get("/hotels").set(headers);
    
    expect(response.body.length).not.toBe(0);
  });
});

