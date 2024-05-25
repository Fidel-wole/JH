import User from "../../models/user.model";

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

}
