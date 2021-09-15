import joi from "joi";
import { isJSDocTypedefTag } from "typescript";

export default joi.object({
  activityId: joi.number().required(),
  beginsAt: joi.string().required(),
  finishesAt: joi.string().required(),
  date: joi.string().required(),
});
