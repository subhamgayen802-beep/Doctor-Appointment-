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
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use("/api/payment", paymentRoutes);

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