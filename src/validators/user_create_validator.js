import Joi from "joi";
import express from "express";
const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string()
    .regex(/^[a-zA-Z0-9]+$/)
    .required(),
  password: Joi.string().min(8).required(),
});

export default function userCreateValidator(data) {
  const { error, value } = schema.validate(data);
  
  return {error, value};
}
