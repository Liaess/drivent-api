export interface ActivityInfo {
  id: number;
  date: Date;
  locationId: number;
  beginsAt: string;
  finishesAt: string;
  title: string;
  remainingSeats: number;
  userRegistered: boolean;
}
