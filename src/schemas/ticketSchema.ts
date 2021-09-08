import joi from "joi";

export default joi.object({
  isOnline: joi.boolean().required(),
  hasHotelReservation: joi.boolean().required(),
});
