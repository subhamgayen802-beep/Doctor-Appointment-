const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending'
    },
    symptoms: String,
    notes: String,
    fees: {
        type: Number,
        require:true
        
    },
    orderId:{
        type:String
    },
    paymentId:{type:String}
    
}, { timestamps: true });

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment',appointmentSchema);
module.exports = Appointment;



 
