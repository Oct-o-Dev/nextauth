import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  if (isConnected) {
    // Already connected
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: 'next-auth', // Ensure this is the DB you want
    });

    const connection = mongoose.connection;

    connection.on('connected', () => {
      isConnected = true;
      console.log("✅ Database connected successfully to 'next-auth'");
    });

    connection.on('error', (err) => {
      console.error("❌ Connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error);
  }
}
