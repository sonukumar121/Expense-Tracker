import express from "express";
import "./auth/google.js";
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
  origin:"https://expense-tracker-zwsb.onrender.com",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
console.log(passport._strategies);
// app.use(passport.session());
// ---------------- ROUTES ----------------
app.use("/api/expense", expenseRoutes);
app.use("/api/users", userRoutes);



app.get("/",(req,res)=>{
  return res.send("backend is running");
})



app.get('/auth/google',
  passport.authenticate('google', { scope: ["profile", "email"],}));
 

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/",
  }),
  async (req, res) => {
    try {
      console.log("USER:", req.user);

      if (!req.user) {
        return res.status(401).send("Google auth failed");
      }

      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

    res.cookie("token", token, {
  httpOnly: true,
  secure: true,
  sameSite: "none",
});

      return res.redirect("https://expense-tracker-zwsb.onrender.com");

    } catch (err) {
      console.log("ERROR:", err);
      return res.status(500).send("Internal Server Error");
    }
  }
);
