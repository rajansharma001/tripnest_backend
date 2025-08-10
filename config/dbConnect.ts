import mongoose from "mongoose";

export const dbConnect = () => {
  mongoose
    .connect(process.env.MONGO_URL!)
    .then(() => {
      console.log("DB CONNECTED SUCCESS!");
    })
    .catch((error) => {
      console.log("DB CONNECTION FAILED:", error);
    });
};
