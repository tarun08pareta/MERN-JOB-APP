// Import mongoose for MongoDB database connection
import mongoose from "mongoose";

// Function to establish connection with MongoDB database
export const dbConnection = () => {
  // Attempt to connect to the MongoDB database using provided URI
  mongoose
    .connect(process.env.MONGO_URI, {
      // Specify the name of the database to connect to
      dbName: "MERN_JOB_SEEKING_WEBAPP",
    })
    .then(() => {
      // If connection is successful, log a success message
      console.log("Connected to the database.");
    })
    .catch((err) => {
      // If an error occurs during connection, log the error message
      console.log(`An error occurred while connecting to the database: ${err}`);
    });
};
