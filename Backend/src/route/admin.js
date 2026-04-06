const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/multer');
const {

    createDoctor,
    getAllDoctors,
    getAllPatients,
    getAllAppointments,
    deleteDoctor,
    adminDashboard,
  
} = require('../controllers/adminController');

router.post('/doctors',protect(['admin']), upload.single('image'), createDoctor);



router.get('/doctors', protect(['admin']),getAllDoctors);
router.get('/patients',protect(['admin']), getAllPatients);
router.get('/appointments',protect(['admin']), getAllAppointments);
router.delete('/doctors/:id',protect(['admin']), deleteDoctor);
router.get('/dashboard', protect(['admin']),adminDashboard);

module.exports = router;