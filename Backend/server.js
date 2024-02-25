// Import the 'app' module from the file './app.js'
import app from "./app.js";

// Import the 'cloudinary' module
import cloudinary from "cloudinary";

// Configure cloudinary using the provided environment variables
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME, // Cloudinary client name
    api_key: process.env.CLOUDINARY_CLIENT_API, // Cloudinary client API key
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET, // Cloudinary client API secret
});

// Define the port on which the server will listen, defaulting to port 7000 if PORT environment variable is not set
const PORT = process.env.PORT || 7000;

// Start the server to listen on the defined port
app.listen(PORT, () => {
    // Log a message to indicate that the server is running and on which port
    console.log(`Server running on Port: ${PORT}`);
});
