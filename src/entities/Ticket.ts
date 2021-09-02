import TicketAlreadyPurchasedError from "@/errors/TicketAlreadyPurchased";
import TicketData from "@/interfaces/ticket";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isOnline: boolean;

  @Column()
  hasHotelReservation: boolean;

  @Column("boolean", { default: false })
  isPaid: boolean;

  @Column()
  userId: number;

  populateFromData(data: TicketData) {
    this.isOnline = data.isOnline;
    this.hasHotelReservation = data.hasHotelReservation;
    this.isPaid = data.isPaid;
    this.userId = data.userId;
  }

  static async createOrUpdate(data: TicketData) {
    let ticket = await this.findOne({ where: { userId: data.userId } });

    if (ticket.isPaid) {
      throw new TicketAlreadyPurchasedError();
    }

    ticket ||= Ticket.create();
    ticket.populateFromData(data);
    await ticket.save();
  }
}
