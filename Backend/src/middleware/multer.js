const multer = require('multer');
const { storage, fileFilter } = require('../config/cloudinary');

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { 
        fileSize: 5 * 1024 * 1024  // 5MB limit
    }
});

module.exports = upload;