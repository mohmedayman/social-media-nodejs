import Joi from "joi";
import express from "express";

const commentSchema = Joi.object().keys({
  content: Joi.string().min(1).required(),
});

/** @param {express.Response} res*/
export default function commentValidator(data) {
  const { error, value } = commentSchema.validate(data);

  return { error, value };
}
