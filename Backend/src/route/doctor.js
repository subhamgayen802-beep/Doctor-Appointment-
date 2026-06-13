// routes/doctorRoutes.js

const express = require('express');
const router = express.Router();
const {
    getMyAppointments,
    updateAppointmentStatus,
    doctorDashboard,
    getAllDoctorsPublic,
    getDoctorById,
    getRelatedDoctors,
    
} = require('../controllers/doctorController');
const protect = require('../middleware/authMiddleware');



router.get('/allDoctors',getAllDoctorsPublic)
router.get('/DoctorRelated/:id/:speciality', getRelatedDoctors);

router.get('/doctor/dashboard',protect(['doctor']),doctorDashboard);
router.get('/doctor/CheckAppointments',protect(['doctor']),getMyAppointments);
router.put('/doctor/appointments/:id/status',protect(['doctor']),updateAppointmentStatus);

router.get('/doctor/:id', getDoctorById);



module.exports = router;