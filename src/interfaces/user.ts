//User interface
export interface User {
    firstname: string;
    lastname: string;
    email: string;
    phone_number?:string;
    address?:string;
    picture?:string;
    emailVerificationToken?:string;
    isEmailVerified?:boolean;
    otp_verification_code?: string;
    otp_expires_at:Date;
    password: string;
    passwordResetToken?:string;
    role?:string;
    stripeCustomerId?:string;
  }
  