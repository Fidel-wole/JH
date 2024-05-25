import mongoose from "mongoose";
import { MONGODB_DB, MONGODB_PASSWORD, MONGODB_USER } from "../configs/env";
import logger from "../utils/logger";
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0.cwzz5uc.mongodb.net/${MONGODB_DB}`;

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
}

export default connectDB