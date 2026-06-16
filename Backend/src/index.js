const express = require("express");
const app = express();
require('dotenv').config();
require("node:dns/promises").setServers(["8.8.8.8", "1.1.1.1"]);
const rateLimiter =require("./middleware/rateLimiter")
const main = require('./config/db');
const redisClient = require("./config/redis");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const authRoutes = require('./route/user');
const adminRoutes = require('./route/admin');
const doctorRoutes = require('./route/doctor');
const patientRoutes = require('./route/patient');
const paymentRoutes = require("./route/payment");


app.use(rateLimiter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



const ALLOWED_ORIGINS = [
  "https://doctor-appointment-omega-dun.vercel.app",
  "http://localhost:5173",
];

app.use(cors({
  origin: (origin, callback) => {
    if (
      !origin ||
      ALLOWED_ORIGINS.includes(origin) ||
      origin.endsWith(".vercel.app") 
    ) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use( "/user",authRoutes);
app.use(adminRoutes);
app.use(doctorRoutes);
app.use( patientRoutes);
app.use(paymentRoutes);

const initalizationConnection = async () => {
    try {
        await Promise.all([main(), redisClient.connect()]);
        console.log("DB connected");
        app.listen(process.env.PORT, () => console.log("Server at port "+process.env.PORT));
    } catch (err) {
        console.log("ERROR: " + err);
    }
}

initalizationConnection();