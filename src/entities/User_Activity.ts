import UserAlreadySubscripted from "@/errors/UserAlreadySubscripted";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  getManager,
} from "typeorm";
import Activity from "./Activity";
import User from "./User";
import { ActivityInfo } from "@/interfaces/activity";
import ScheduleConflictError from "@/errors/ScheduleConflictError";

@Entity("users_activities")
export default class User_Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  activityId: number;

  @ManyToOne(() => Activity, (activity) => activity.user_activity)
  activity: Activity;

  @ManyToOne(() => User, (user) => user.user_activity)
  user: User;

  populateSubscription(userId: number, activityId: number) {
    this.userId = userId;
    this.activityId = activityId;
  }

  static async subscription(userId: number, activityInfo: ActivityInfo) {
    const { beginsAt, finishesAt, date } = activityInfo;
    const activityId = activityInfo.id;
    let userActivity = await this.findOne({ where: { userId, activityId } });
    // eslint-disable-next-line no-console
    console.log("g", userActivity);

    if (userActivity) {
      throw new UserAlreadySubscripted();
    }

    if (await this.verifyScheduleConflict(userId, activityInfo)) {
      // eslint-disable-next-line no-console
      console.log("verificação", this.verifyScheduleConflict(userId, activityInfo));
      throw new ScheduleConflictError();
    }

    userActivity = User_Activity.create();
    userActivity.populateSubscription(userId, activityId);
    const activity = await Activity.removeOneSeat(activityId);
    getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(userActivity);
      await transactionalEntityManager.save(activity);
    });
    return activity.remainingSeats;
  }

  static async verifyScheduleConflict(
    userId: number,
    activityInfo: ActivityInfo
  ) {
    const { beginsAt, finishesAt, locationId } = activityInfo;
    const activityId = activityInfo.id;
    const date = new Date(activityInfo.date);

    const activities = await Activity.getActivitiesByDate(date, userId);
    const conflict = activities.find(
      (a) =>
        a.date === date &&
        a.locationId !== locationId &&
        a.id !== activityId &&
        ((a.beginsAt < beginsAt && a.finishesAt > beginsAt) ||
          (a.beginsAt < finishesAt && a.finishesAt > finishesAt))
    );
    // eslint-disable-next-line no-console
    console.log("check conflict", conflict);

    return !!conflict;
  }
}
