import joi from "joi";

export default joi.object({
  activityId: joi.number().required(),
});
