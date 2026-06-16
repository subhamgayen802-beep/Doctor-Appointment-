const redisClient = require('../config/redis');
const User =require('../models/user');
const validate=require('../utils/validator');
const bcrypt=require('bcryptjs');
const Appointment = require('../models/appointment')

 const jwt = require('jsonwebtoken');


 
const createDoctor = async (req, res) => {
  try {
    console.log("REQ RESULT:", req.result);
    const {
      firstName, emailId, password,
      specialization, experience, fees, phone, description
    } = req.body;

    if (!firstName || !emailId || !password || !specialization) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const existingDoctor = await User.findOne({ emailId });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctorData = {
      firstName, emailId,
      password: hashedPassword,
      role: "doctor",
      specialization,
      experience: experience || 0,
      fees: fees || 0,
      phone, description,
      createdBy: req.result._id
    };

    

   
    if (req.file) {
      doctorData.image = req.file.path;
      doctorData.cloudinaryId = req.file.filename;
    }

    const doctor = await User.create(doctorData);

    const doctorResponse = doctor.toObject();
    delete doctorResponse.password;

    res.status(201).json({
      message: "Doctor created successfully",
      doctor: doctorResponse
    });

  } catch (err) {

    res.status(500).json({ message: "Error: " + err.message });
  }
};


const getAllDoctors = async (req, res) => {
    try {
        
        const doctors = await User.find({ role: 'doctor' }).select('-password');
      
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
        const patients = await User.find({ role: 'patient' }).select('-password');

    
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

module.exports = {createDoctor,getAllDoctors,getAllPatients,getAllAppointments,deleteDoctor,adminDashboard
};