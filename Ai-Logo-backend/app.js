import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import session from "express-session";
import passport from "./config/passport.config.js";
import loginrouter from "./router/loginrouter.js";
import authRoutes from "./router/auth.routes.js";
import premiumRoutes from "./router/premium.routes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api", loginrouter);
app.use("/api/auth", authRoutes);
app.use("/api", premiumRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.get("/", (req, res) => {
//   res.send("Ai-Logo Backend is running");
// });

export default app;
