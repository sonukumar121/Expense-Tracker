// middlewares/validation.js
import { body } from "express-validator";

export const signupValidation = [
  body("name")
    .isAlpha()
    .withMessage("Name must contain only letters"),

  body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Please enter valid email"),

  body("password")
    .trim()
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Minimum 6 characters required"),
];


export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Enter a valid email address"),

  body("password")
    .notEmpty()
    .withMessage("Password is required"),
];