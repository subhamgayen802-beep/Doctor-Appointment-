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

router.get('/all',getAllDoctorsPublic)
router.get('/related/:id/:speciality', getRelatedDoctors);

router.get('/dashboard', protect(['doctor']),doctorDashboard);
router.get('/appointments',protect(['doctor']),getMyAppointments);
router.put('/appointments/:id/status', protect(['doctor']),updateAppointmentStatus);

router.get('/:id', getDoctorById);



module.exports = router;