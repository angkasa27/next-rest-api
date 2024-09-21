import mongoose from "mongoose";

const MOONGO_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }

  if (connectionState === 2) {
    console.log("Connecting to MongoDB...");
    return;
  }

  try {
    mongoose.connect(MOONGO_URI!, {
      dbName: "next14restapi",
      bufferCommands: true,
    });
    console.log("Connected to MongoDB");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error connecting to MongoDB: ", error);
    throw new Error("Error : ", error);
  }
};

export default connect;
