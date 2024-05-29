import User from "../../models/user.model";
import crypto from "crypto";
import twilio from 'twilio';
import { TWILIO_PHONE_NUMBER, TWILIO_ACCOUNT_SID, TWILIO_AUTHTOKEN, TWILIO_SERVICES_ID} from "../../configs/env";
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTHTOKEN);


const generateOtp = () => {
  const otp = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
  return { otp };
};
export default class AuthService {
  static async addUser(data: any) {
    try {
      return await User.create(data);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  static async findUserByEmail(email: string): Promise<any> {
    try {
      const user = await User.findOne({
        email: email,
      });
      return user;
    } catch (error: any) {
      return error;
    }
  }

  static async findUser(email: string) {
    try {
      return await User.findOne({ email: email });
    } catch (err: any) {
      throw err;
    }
  }
  static async findUserByNumber(phone_number: string) {
    try {
      return await User.findOne({ phone_number: phone_number });
    } catch (err: any) {
      throw new Error(err);
    }
  }

 static async sendOtp (phoneNumber:any){
    const { otp } = generateOtp();
    const message = `Your verification code is: ${otp}. Please enter this code to complete your verification. Do not share this code with anyone.`;
  
    try {
     const sendOTP = await client.messages.create({
        body: message,
        to: phoneNumber,
        from: TWILIO_PHONE_NUMBER,
      });
  console.log(sendOTP)
      return otp
    } catch (error:any) {
      throw error
    }
  };
  

  static async verifyOTP(otpCode:number){
  try{
    const currentDateTime = new Date();
    const otpEntry = await User.findOne({
      otpCode,
     otp_expires_at: { $gt: currentDateTime },
    });

    return otpEntry;
  }catch(err:any){
    throw err
  }

  };
  // resendOtp = async (phoneNumber) => {
  //   await OtpEntry.deleteMany({ phoneNumber }); // Cleanup old entries
  //   return this.sendOtp(phoneNumber);
  // };
}

