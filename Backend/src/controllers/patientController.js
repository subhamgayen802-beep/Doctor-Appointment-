const Appointment = require('../models/appointment');
const User = require('../models/user')


const bookAppointment = async (req, res) => {
  try {

    const { doctorId, appointmentDate, timeSlot,fees } = req.body;


    if (!doctorId || !appointmentDate || !timeSlot || !fees) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const appointment = await Appointment.create({
      patient: req.result.id,
      doctorId,
      appointmentDate,
      timeSlot,
      fees
    });

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (err) {
    console.log("BOOK ERROR:", err);

    res.status(500).json({
      message: err.message || "Server Error"
    });
  }
};
const getMyAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ patient: req.result._id })
            .sort({ appointmentDate: -1 });

        const result = [];
        for (let apt of appointments) {
            const doctor = await User.findById(apt.doctorId).select('firstName');
            result.push({
                _id: apt._id,
                appointmentDate: apt.appointmentDate,
                timeSlot: apt.timeSlot,
                status: apt.status,
                 fees: apt.fees, 
              doctor: doctor ? {     firstName: doctor.firstName,      } : { firstName: 'Unknown', specialization: 'N/A' }
            });
        }

        res.status(200).json({
            count: result.length,
            appointments: result
        });
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
};


const cancelAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        
        const appointment = await Appointment.findOne({
            _id: id,
            patient: req.result._id
        });
        
        if (!appointment) {
            return res.status(404).json('Appointment not found');
        }
        
        appointment.status = 'cancelled';
        await appointment.save();
        
        res.status(200).json({
            message: 'Appointment cancelled successfully',
            appointment
        });
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
};

module.exports = {
    bookAppointment,
    getMyAppointments,
    cancelAppointment,
 
};