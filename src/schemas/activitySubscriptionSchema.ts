import joi from "joi";

export default joi.object({
  id: joi.number().required(),
  date: joi.string().required(),
  locationId: joi.number().required(),
  beginsAt: joi.string().required(),
  finishesAt: joi.string().required(),
  title: joi.string().required(),
  remainingSeats: joi.number().required(),
  userRegistered: joi.boolean().required(),
});
