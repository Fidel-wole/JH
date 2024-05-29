import mongoose, { Schema, Document } from "mongoose";
import { User as UserInterface } from "../interfaces/user";


// Define the schema using the User interface
const user= new Schema<UserDocument>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone_number: { type: String, unique: true,},
  address:{type:String},
  picture:{type:String},
  emailVerificationToken: { type: String },
  isEmailVerified: { type: Boolean, default: false },
  password: { type: String, required: true },
  passwordResetToken: { type: String },
  otp_verification_code:{ type: String },
  otp_expires_at:{type:Date},
  role: {
    type: String,
    enum: ["user", "admin"],
    default: 'user',
  }
});

interface UserDocument extends UserInterface, Document {}
const User = mongoose.model<UserDocument>("User", user);
export default User;