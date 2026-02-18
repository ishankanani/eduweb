import dotenv from "dotenv";
dotenv.config(); // ✅ MUST RUN BEFORE OTHER IMPORTS THAT USE ENV

import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
