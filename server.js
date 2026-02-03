import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

// 🔴 THIS MUST BE FIRST
dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
