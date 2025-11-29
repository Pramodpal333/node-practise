import mongoose from "mongoose";

export const connectMongoDb = async (connectionUrl) => {
  const connection = await mongoose.connect(connectionUrl);
  return connection;
};
