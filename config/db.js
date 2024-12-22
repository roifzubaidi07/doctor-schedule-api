import mongoose from 'mongoose';

export const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
// The db.js file contains the connectdb function that connects to the MongoDB database using the MONGO_URI environment variable. If the connection is successful, it logs a message to the console. If there is an error, it logs the error message and exits the process with a failure status code.
// Compare this snippet from schedule.route.js:
