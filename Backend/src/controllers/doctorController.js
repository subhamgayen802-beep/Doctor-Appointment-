const User = require('../models/schema');
const Appointment = require('../models/appointment');


const getMyAppointments = async (req, res) => {
  try {

    const appointments = await Appointment.find({
      doctorId: req.user._id
    })
      .populate('patient', 'firstName emailId')
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      appointments
    });

  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = [
      'pending',
      'confirmed',
      'completed',
      'cancelled'
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status'
      });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        error: 'Not authenticated'
      });
    }

    const appointment = await Appointment.findOneAndUpdate(
      {
        _id: id,
        doctorId: req.user._id
      },
      { status },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      appointment
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success:false,
      error: err.message
    });
  }
};

const doctorDashboard = async (req, res) => {
  try {

    const doctorId = req.user._id;

 
    const todayStart = new Date();
    todayStart.setHours(0,0,0,0);
 
    const todayEnd = new Date();
    todayEnd.setHours(23,59,59,999);

    const totalAppointments = await Appointment.countDocuments({
      doctorId
    });


    const pendingAppointments = await Appointment.countDocuments({
      doctorId,
      status: "pending"
    });


    const completedAppointments = await Appointment.countDocuments({
      doctorId,
      status: "completed"
    });

  
    const todaysAppointments = await Appointment.countDocuments({
      doctorId,
      appointmentDate: {
        $gte: todayStart,
        $lte: todayEnd
      }
    });

    res.json({
      success: true,
      stats: {
        totalAppointments,
        pendingAppointments,
        completedAppointments,
        todaysAppointments
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


const  getAllDoctorsPublic  = async (req, res)=> {
    try{
   const doctors = await User.find({ role: 'doctor' }).select('-password -__v').sort({ createdAt: -1 });
           res.status(200).json({
            count: doctors.length,
            doctors
        });
    }
    catch (err){
      res.status(500).send('Error: ' + err.message);
    }
    
   }

const getDoctorById = async (req, res) => {
    try {
        const doctor = await User.findOne({ 
            _id: req.params.id, 
            role: 'doctor' 
        }).select('-password -__v');

        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

       
        const formattedDoctor = {
            _id: doctor._id,
            firstName: doctor.firstName || doctor.name,
            name: doctor.firstName || doctor.name,
            email: doctor.emailId || doctor.email,
            phone: doctor.phone,
            specialization: doctor.specialization || doctor.speciality,
            speciality: doctor.specialization || doctor.speciality,
            experience: doctor.experience,
            fees: doctor.fees,
            description: doctor.description || doctor.about,
            about: doctor.description || doctor.about,
            image: doctor.image || doctor.photo,
            photo: doctor.image || doctor.photo,
            address: doctor.address,
            isAvailable: doctor.isAvailable,
            available: doctor.available
        };

        res.json({
            success: true,
            data: formattedDoctor
        });
    } catch (error) {
       
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};


const getRelatedDoctors = async (req, res) => {
    try {
        const { id, speciality } = req.params;
        
        const doctors = await User.find({ 
            role: 'doctor',
            $or: [
                { specialization: speciality },
                { speciality: speciality }
            ],
            _id: { $ne: id }
        })
        .select('-password -__v') 
        .limit(5);

      
        const formattedDoctors = doctors.map(doc => ({
            _id: doc._id,
            name: doc.firstName || doc.name,
            firstName: doc.firstName || doc.name,
            speciality: doc.specialization || doc.speciality,
            specialization: doc.specialization || doc.speciality,
            experience: doc.experience,
            photo: doc.image || doc.photo,
            image: doc.image || doc.photo,
            fees: doc.fees
        }));

        res.json({
            success: true,
            count: formattedDoctors.length,
            data: formattedDoctors
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

module.exports = {
    getMyAppointments,
    updateAppointmentStatus,
    doctorDashboard,
    getAllDoctorsPublic,
    getDoctorById,
    getRelatedDoctors,
    
};