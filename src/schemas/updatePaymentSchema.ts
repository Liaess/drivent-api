import joi from "joi";

export default joi.object({
  id: joi.number().required(),
  isOnline: joi.boolean().required(),
  hasHotelReservation: joi.boolean().required(),
  isPaid: joi.boolean().required(),
  userId: joi.number().required(),
});
