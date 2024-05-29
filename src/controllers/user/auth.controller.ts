import { User } from "../../interfaces/user"; 
import { Request, Response } from "express";
import dispatcher from "../../utils/dispatcher";
import AuthService from "../../services/user/auth.service";
import logger from "../../utils/logger";
import { hashPassword, comparePasswords, jsonwebtoken } from "../../utils/functions";

export class AuthController {
  static async addUser(req: Request, res: Response) {
    const { body } = req;
    const expiresAt = new Date(new Date().getTime() + 5 * 60000);
    const userData: User = {
      firstname: body.firstname,
      lastname: body.lastname,
      email: body.email,
      phone_number: body.phone_number,
      password: body.password,
      address: body.address,
      otp_verification_code:"",
      otp_expires_at:expiresAt
    };

    try {
      const user = await AuthService.findUserByEmail(body.email);
      if (!user) {
       // userData.otp_verification_code = await AuthService.sendOtp(userData.phone_number)
        userData.password = await hashPassword(userData.password); // Make sure hashPassword is async if it returns a Promise
        const createUser :any = await AuthService.addUser(userData);
        if (createUser) {
          const token = jsonwebtoken(createUser._id.toString(), createUser.email); // Ensure _id is converted to a string
          logger.info("UserController.register");
          dispatcher.DispatchCustomMessage(
            res,
            "You have successfully been registered",
            201,
            'OK',
            token
          );
        }
      } else {
        return dispatcher.DispatchErrorMessage(res, "User already exists");
      }
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, err.message);
    }
  }

  static async signIn(req: Request, res: Response) {
    const { body } = req;
    try {
      let user:any;
      // Check if the request contains an email or a phone number
      if (body.email) {
        user = await AuthService.findUser(body.email);
      } else if (body.phone_number) {
        user = await AuthService.findUserByNumber(body.phone_number);
      } else {
        dispatcher.DispatchErrorMessage(
          res,
          "Email or phone number is required"
        );
        return;
      }

      if (!user) {
        dispatcher.DispatchErrorMessage(res, "User not found");
        return;
      }

      const isPasswordValid = await comparePasswords(
        body.password,
        user!.password
      );

      if (!isPasswordValid) {
        dispatcher.DispatchErrorMessage(res, "Incorrect Password");
        return;
      }

      const token = jsonwebtoken(user!._id, user!.email);
      dispatcher.DispatchSuccessMessage(
        res,
        "User logged in successfully",
        token
      );
    } catch (err: any) {
      dispatcher.DispatchErrorMessage(res, "Error occurred during login");
    }}
  }