// Import necessary modules and libraries
import express from "express"; // Import Express framework
import dotenv from 'dotenv'; // Import dotenv for environment variables
import cors from "cors"; // Import CORS for Cross-Origin Resource Sharing
import cookieParser from "cookie-parser"; // Import cookie-parser for handling cookies
import fileUpload from "express-fileupload"; // Import express-fileupload for handling file uploads
import userRouter from "./routes/user.routes.js"; // Import user routes
import jobRouter from "./routes/job.routes.js"; // Import job routes
import applicationRoutes from "./routes/application.routes.js"; // Import application routes
import { dbConnection } from "./db/dbConnection.js"; // Import database connection function
import { errorMiddleware } from "./middleware/error.js"; // Import error middleware

// Create an Express application instance
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // Allow requests from specified frontend URL
    method: ["GET", "POST", "DELETE", "PUT"], // Allow specified HTTP methods
    credentials: true, // Allow credentials (e.g., cookies, authorization headers)
  })
);
app.use(cookieParser()); // Parse cookies in requests
app.use(express.json()); // Parse JSON bodies in requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies in requests

// Configure file upload middleware
app.use(
  fileUpload({
    useTempFiles: true, // Use temporary files for file uploads
    tempFileDir: "/tmp/", // Temporary directory for file uploads
  })
);

// Route setup
app.use("/api/v1/user", userRouter); // Mount user routes
app.use("/api/v1/user", applicationRoutes); // Mount application routes
app.use("/api/v1/user", jobRouter); // Mount job routes

// Connect to the database
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

// Export the Express application instance
export default app;
