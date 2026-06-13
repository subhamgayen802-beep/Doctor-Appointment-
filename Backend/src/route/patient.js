const express = require('express');
const router = express.Router();
const protect = require("../middleware/authMiddleware")
const {
    bookAppointment,
    getMyAppointments,
    cancelAppointment,
    
} = require('../controllers/patientController');
router.use(protect(['patient']));

router.post('/patients/bookappointments', bookAppointment);
router.get('/patients/myappointments',getMyAppointments);
router.put('/patients/appointments/:id/cancel',cancelAppointment);

module.exports = router;