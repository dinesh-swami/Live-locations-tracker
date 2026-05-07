import mongoose from "mongoose";

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is required to connect to MongoDB.");
  }

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB_NAME || undefined,
  });

  isConnected = true;
  console.log("MongoDB connected");

  return mongoose.connection;
}

export default connectToDatabase;
console.log('testing')
