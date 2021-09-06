export interface TicketData {
  isOnline: boolean;
  hasHotelReservation: boolean;
  isPaid: boolean;
  userId: number;
}

export interface TicketDataToUpdate {
  id: number;
  isOnline: boolean;
  hasHotelReservation: boolean;
  isPaid: boolean;
  userId: number;
}
