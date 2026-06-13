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


app.use(cors({
    origin: 'https://doctor-appointment-ayl3k51ad-subhamgayen802-4438s-projects.vercel.app' ||'http://localhost:5173',
    credentials: true,
}));

app.use( authRoutes);
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