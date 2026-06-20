import express from "express";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import jwt from "jsonwebtoken";
// import "./auth/google.js";
//  const API_URL = import.meta.env.API_URL;
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/Db.js";
import expenseRoutes from "./route/expenseRoutes.js";
import userRoutes from "./route/userRoutes.js";
import dns from "dns";
dns.setServers(["1.1.1.1" , "8.8.8.8"])


const app = express();

// ---------------- DB CONNECT ----------------
connectDB().then(() => {
  app.listen(process.env.PORT, "0.0.0.0",() => {
    console.log("Server running on port", process.env.PORT);
  });
});

// ---------------- MIDDLEWARE ----------------
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
// app.use(passport.session());
// ---------------- ROUTES ----------------
app.use("/api/expense", expenseRoutes);
app.use("/api/users", userRoutes);



// app.get("/",(req,res)=>{
//   return res.send("backend is running");
// })















