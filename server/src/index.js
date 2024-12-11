import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/db_connection.js";

// configure dotenv
dotenv.config({
  path: "./env",
});

// connect to database
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection Failed !", error);
  });
