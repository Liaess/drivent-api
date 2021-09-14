import CannotUpdateNotFoundActivity from "@/errors/CannotUpdateNotFoundActivity";
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
  beginsAt: number;
  finishesAt: number;
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

  @Column()
  beginsAt: number;

  @Column()
  finishesAt: number;

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
      .orderBy("activities.id", "ASC")
      .getMany();

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

    activity.updateSeats(updateValue);
    await activity.save();
  }
}
