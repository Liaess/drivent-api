import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("recoveries")
export default class Recovery extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  token: string;
}
