import mongoose from 'mongoose';

/**
 * Establishes a connection to MongoDB using the connection URI from environment variables.
 * @returns {Promise<mongoose.Connection>} A promise that resolves with the mongoose connection object.
 * @throws Will throw an error if the MONGODB_URI is not defined or if the connection fails.
 */
const dbConnection = async () => {
  try {  
    // Check for the presence of the MongoDB URI in the environment variables
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not defined in environment.");
    }
    // Attempt to connect to MongoDB using the URI
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    // Log the successful connection and return the connection instance
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    // Log any errors during connection and exit the application
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Disconnects from MongoDB.
 * Intended to be used for graceful shutdowns or in scenarios where persistent connections are not required.
 */
const dbDisconnect = async () => {
  try {
    // Attempt to disconnect from MongoDB
    await mongoose.disconnect();
    // Log successful disconnection
    console.log('MongoDB Disconnected');
  } catch (error) {
    // Log any errors encountered during disconnection
    console.error('Failed to disconnect MongoDB:', error.message);
  }
};

export { dbConnection, dbDisconnect };
