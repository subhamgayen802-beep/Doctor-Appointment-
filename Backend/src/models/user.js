const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength:6,
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'admin'],
        default: 'patient'
    },
    
    phone: String,
    // Doctor fields
    specialization: String,
    experience: { type: Number, default: 0 },
    image: { 
        type: String, 
       default: "https://res.cloudinary.com/default-doctor.png",
        
    },
    description: { type: String, default: '' },
    fees: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    // Patient fields
    address: String,
    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    // Admin created doctor
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });


const User = mongoose.models.user || mongoose.model('User',userSchema)
module.exports = User; 

