import CannotUpdateNotFoundActivity from "@/errors/CannotUpdateNotFoundActivity";
import InsufficientSeatsError from "@/errors/InsufficientSeatsError";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Location from "./Location";
import UserActivity from "./User_Activity";

interface ActivitiesResponse {
  id: number;
  date: Date;
  locationId: number;
  beginsAt: string;
  finishesAt: string;
  title: string;
  remainingSeats: number;
  userRegistered: boolean;
}
@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  locationId: number;

  @Column({ type: "time with time zone" })
  beginsAt: string;

  @Column({ type: "time with time zone" })
  finishesAt: string;

  @Column()
  title: string;

  @Column()
  remainingSeats: number;

  @ManyToOne(() => Location, { eager: true })
  location: Location;

  @OneToMany(() => UserActivity, (user_activity) => user_activity.activity)
  user_activity: UserActivity[];

  updateSeats(operation: number) {
    this.remainingSeats += operation;
  }

  static async getAllDates() {
    return await this.createQueryBuilder("activities")
      .select("date")
      .distinct(true)
      .orderBy("date", "ASC")
      .getRawMany();
  }

  static async getActivitiesByDate(
    date: Date,
    userId: number
  ): Promise<ActivitiesResponse[]> {
    const activities = await this.createQueryBuilder("activities")
      .leftJoinAndSelect("users_activities", "user", "user.id= :userId", {
        userId,
      })
      .where({ date })
      .orderBy("activities.beginsAt", "ASC")
      .getMany();

    // eslint-disable-next-line no-console
    console.log(activities);

    const activitiesResponse: ActivitiesResponse[] = activities.map(
      (a: Activity) => {
        return {
          id: a.id,
          date: a.date,
          locationId: a.locationId,
          beginsAt: a.beginsAt,
          finishesAt: a.finishesAt,
          title: a.title,
          remainingSeats: a.remainingSeats,
          userRegistered: a.user_activity?.length > 0,
        };
      }
    );

    return activitiesResponse;
  }

  static async removeOneSeat(activityId: number) {
    const activity = await this.findOne({ where: { id: activityId } });
    const updateValue = -1;

    if (!activity) {
      throw new CannotUpdateNotFoundActivity();
    }
    if (activity.remainingSeats <= 0) {
      throw new InsufficientSeatsError();
    }
    activity.updateSeats(updateValue);
    return activity;
  }
}
