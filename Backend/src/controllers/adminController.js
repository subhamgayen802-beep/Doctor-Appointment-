const redisClient = require('../config/redis');
const User =require('../models/schema');
const validate=require('../utils/validator');
const bcrypt=require('bcryptjs');
const Appointment = require('../models/appointment')

 const jwt = require('jsonwebtoken');


 

const adminLogin = async (req, res) => {
    try {
        const { emailId, passWord } = req.body;
        
        if (!emailId || !passWord) {
            throw new Error('Invalid credentials');
        }
        
        const admin = await User.findOne({ emaAilId, role: 'admin' });
        if (!admin) {
            throw new Error('dmin not found');
        }
        
        const match = await bcrypt.compare(passWord, admin.passWord);
        if (!match) {
            throw new Error('Invalid credentials');
        }
        
        const token = jwt.sign(
            { _id: admin._id, emailId: emailId, role: admin.role },
             process.env.JWT_KEY,
            { expiresIn: '1h' }
        );
        
        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });
        res.status(200).send('Admin login successfully');
    } catch (err) {
        res.status(401).send('Error: ' + err.message);
    }
};
const createDoctor = async (req, res) => {
  try {


     
    const {
      firstName,
      emailId,
      passWord,
      specialization,
      experience,
      fees,
      phone,
      description
    } = req.body;

    if (!firstName || !emailId || !passWord || !specialization) {
      return res.status(400).json("All required fields must be provided");
    }

    const existingDoctor = await User.findOne({ emailId });
    if (existingDoctor) {
      return res.status(400).json("Doctor already exists");
    }

    const hashedPassword = await bcrypt.hash(passWord, 10);

    const doctorData = {
      firstName,
      emailId,
      passWord: hashedPassword,
      role: "doctor",
      specialization,
      experience: experience || 0,
      fees: fees || 0,
      phone,
      description,
      createdBy: req.user._id
    };


    if (req.file) {
      doctorData.image = req.file.path;          
      doctorData.cloudinaryId = req.file.filename; 
    }

    const doctor = await User.create(doctorData);

    res.status(200).json({
      message: "Doctor created successfully",
      doctor
    });

  } catch (err) {
    res.status(400).json("Error: " + err.message);
  }
};


const getAllDoctors = async (req, res) => {
    try {
        
        const doctors = await User.find({ role: 'doctor' }).select('-passWord');
      
        res.status(200).json({
            count: doctors.length,
            doctors
        });
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
};
const getAllPatients = async (req, res) => {
    try {
        const patients = await User.find({ role: 'patient' }).select('-passWord');

    
        res.status(200).json({
            count: patients.length,
            patients
        });
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
};

const getAllAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find()
      .populate("patient", "firstName emailId phone")
      .populate("doctorId", "firstName specialization")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: appointments.length,
      appointments
    });

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await User.findOne({ _id: id, role: 'doctor' });
        
        if (!doctor) {
            return res.status(404).json('Doctor not found');
        }
        
        await User.findByIdAndDelete(id);
        res.status(200).send('Doctor deleted successfully');
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
};

const adminDashboard = async (req, res) => {
    try {
        const totalDoctors = await User.countDocuments({ role: 'doctor' });
        const totalPatients = await User.countDocuments({ role: 'patient' });
        const totalAppointments = await Appointment.countDocuments();
        const pendingAppointments = await Appointment.countDocuments({ status: 'pending' });
        
        res.status(200).json({
            stats: {
                totalDoctors,
                totalPatients,
                totalAppointments,
                pendingAppointments
            }
        });
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
};

module.exports = {adminLogin,createDoctor,getAllDoctors,getAllPatients,getAllAppointments,deleteDoctor,adminDashboard
};