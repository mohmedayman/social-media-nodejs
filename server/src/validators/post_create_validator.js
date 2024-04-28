import Joi from "joi";
import express from "express";
const schema = Joi.object().keys({
  content: Joi.string().min(1).required(),
});

/** @param {express.Response} res*/
export default function userCreateValidator(data) {
  const { error, value } = schema.validate(data);

  return { error, value };
}
