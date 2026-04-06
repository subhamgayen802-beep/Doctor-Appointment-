const express = require('express');
const router = express.Router();
const protect = require("../middleware/authMiddleware")
const {
    bookAppointment,
    getMyAppointments,
    cancelAppointment,
    
} = require('../controllers/patientController');

router.use(protect(['patient']));


router.post('/appointments', bookAppointment);
router.get('/appointments', getMyAppointments);
router.put('/appointments/:id/cancel',cancelAppointment);

module.exports = router;