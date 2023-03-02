import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

export const connectToDatabase = async () => {
  try {
    await mongoose
      .connect(`${process.env.MONGODB_URI}`)
      .then(console.log('Database is succesfully connected'));
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
