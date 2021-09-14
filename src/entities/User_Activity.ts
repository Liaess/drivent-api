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

  static async subscription(userId: number, activityId: number) {
    let userActivity = await this.findOne({ where: { userId, activityId } });

    if (!userActivity) {
      throw new UserAlreadySubscripted();
    }

    userActivity = User_Activity.create();
    userActivity.populateSubscription(userId, activityId);
    const activity = await Activity.removeOneSeat(activityId);
    getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(userActivity);
      await transactionalEntityManager.save(activity);
    });
  }
}
