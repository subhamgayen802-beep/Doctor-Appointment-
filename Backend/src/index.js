const express = require("express");
const app = express();
require('dotenv').config();

const main = require('./config/db');
const redisClient = require("./config/redis");
const cookieParser = require("cookie-parser");
const cors = require('cors');

const authRoutes = require('./route/auth');
const adminRoutes = require('./route/admin');
const doctorRoutes = require('./route/doctor');
const patientRoutes = require('./route/patient');
const paymentRoutes = require("./route/payment");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://doctor-appointment-nine-drab.vercel.app/"
    ],
    credentials: true,
}));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use("/api/payment", paymentRoutes);

const initalizationConnection = async () => {
    try {
        await main();

        try {
            await redisClient.connect();
            console.log("Redis connected");
        } catch (err) {
            console.log("Redis failed, skipping...");
        }

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log("Server running on port " + PORT);
        });

    } catch (err) {
        console.log("ERROR: " + err);
    }
}

initalizationConnection();