// external modules
import mongoose from "mongoose";
import app from "./app";

import dotenv from "dotenv";
dotenv.config(); // MUST be at the top before using process.env

// internal modules

let server;

/**
 * Connects to MongoDB and starts the Express server.
 * Logs a message to the console indicating success or failure.
 * @returns {Promise<void>}
 */
const startServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!);

    console.log("Connected to DB!!");

    server = app.listen(process.env.PORT, () => {
      console.log(`Server is listening to port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};


// start the server
(async () => {
  await startServer();
})();
