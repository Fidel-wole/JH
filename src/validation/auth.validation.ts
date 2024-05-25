import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateUser = [
  body('firstname')
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters long'),
    body('lastname')
    .isString()
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be between 3 and 20 characters long'),
  body('email')
    .isEmail()
    .withMessage('Email is not valid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
