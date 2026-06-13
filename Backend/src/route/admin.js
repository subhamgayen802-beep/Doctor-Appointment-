const express = require('express');
const router = express.Router();
const adminMiddle = require('../middleware/adminMiddle');
const upload = require('../middleware/multer');
const {

    createDoctor,
    getAllDoctors,
    getAllPatients,
    getAllAppointments,
    deleteDoctor,
    adminDashboard,
  
} = require('../controllers/adminController');




router.post('/admin/createDoctor',adminMiddle, upload.single('image'), createDoctor);

router.get('/admin/Alldoctors', adminMiddle,getAllDoctors);
router.get('/admin/allpatients',adminMiddle, getAllPatients);
router.get('/admin/allappointments',adminMiddle, getAllAppointments);
router.delete('/admin/doctors/:id',adminMiddle, deleteDoctor);
router.get('/admin/Mydashboard', adminMiddle,adminDashboard);

module.exports = router;