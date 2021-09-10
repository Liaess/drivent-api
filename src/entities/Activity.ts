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

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  locationId: number;

  @Column()
  beginsAt: string;

  @Column()
  finishesAt: string;

  @Column()
  title: string;

  @Column()
  remainingSeats: number;

  @ManyToOne(() => Location, { eager: true })
  location: Location;

  @OneToMany(() => UserActivity, (user_activity) => user_activity.activity)
  user_activity: UserActivity[];

  static async getAllDates() {
    return await this.createQueryBuilder("activities")
      .select("date")
      .distinct(true)
      .orderBy("date", "ASC")
      .getRawMany();
  }

  static async getActivitiesByDate(date: Date) {
    return await this.find({ where: { date } });
  }

  //   static async updateSeats(activityId: number) {}
}
