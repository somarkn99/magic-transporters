import mongoose from 'mongoose';

const dbConnection = async () => {
  try {  
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI not defined in environment.");
    }
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const dbDisconnect = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB Disconnected');
  } catch (error) {
    console.error('Failed to disconnect MongoDB:', error.message);
  }
};

export { dbConnection, dbDisconnect };
