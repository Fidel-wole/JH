import bcrypt from "bcryptjs";
import appConfig from "../configs/app";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/env";

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, appConfig.constants.SALT_ROUNDS);
}

export async function comparePasswords(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, hashedPassword);
}

export function jsonwebtoken(userId: string, email:string): string {
  const secret = JWT_SECRET;

  if (!secret) {
    throw new Error("JWT access secret is not defined in the environment.");
  }

  return jwt.sign(
    {
      userId: userId,
      email: email
    },
    secret,
    {
      expiresIn: "24h",
    }
  );
}