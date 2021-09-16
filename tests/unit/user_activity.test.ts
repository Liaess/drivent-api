import Activity from "../../src/entities/Activity";
import User_Activity from "../../src/entities/User_Activity";
import ScheduleConflictError from "../../src/errors/ScheduleConflictError";
import UserAlreadySubscripted from "../../src/errors/UserAlreadySubscripted";
import { ActivityInfo } from "../../src/interfaces/activity";

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {
      static async findOne() {
        undefined;
      }
      static async insert() {
        undefined;
      }
      static async find() {
        undefined;
      }
      async save() {
        undefined;
      }
    },
    Entity: () => {
      undefined;
    },
    PrimaryGeneratedColumn: () => {
      undefined;
    },
    Column: () => {
      undefined;
    },
    OneToMany: () => {
      undefined;
    },
    ManyToOne: () => {
      undefined;
    },
    OneToOne: () => {
      undefined;
    },
  };
});

describe("Activity.subscribe", () => {
  it("should throw conflict status for already signed user", async () => {
    jest
      .spyOn(User_Activity, "findOne")
      .mockImplementationOnce(async () => ({} as Activity));
    const asyncFunction = () =>
      User_Activity.subscription(1, {} as ActivityInfo);
    await expect(asyncFunction).rejects.toThrow(UserAlreadySubscripted);
  });

  it("should throw conflict status for schedule conflict", async () => {
    jest
      .spyOn(User_Activity, "findOne")
      .mockImplementationOnce(async () => undefined);
    jest
      .spyOn(User_Activity, "verifyScheduleConflict")
      .mockImplementationOnce(async () => true);
    const asyncFunction = () =>
      User_Activity.subscription(1, {} as ActivityInfo);
    await expect(asyncFunction).rejects.toThrow(ScheduleConflictError);
  });

  it("should throw OK status successful subscription", async () => {
    jest
      .spyOn(User_Activity, "findOne")
      .mockImplementationOnce(async () => undefined);
    jest
      .spyOn(User_Activity, "verifyScheduleConflict")
      .mockImplementationOnce(async () => false);
    const activityBody = {
      id: 1,
      date: new Date(),
      title: "whatever",
      beginsAt: "09:00 UTC",
      finishesAt: "12:00 UTC",
      remainingSeats: 15,
      locationId: 1,
      userRegistered: false,
    } as ActivityInfo;
    const asyncFunction = () => User_Activity.subscription(1, activityBody);
    await expect(asyncFunction).resolves;
  });
});
