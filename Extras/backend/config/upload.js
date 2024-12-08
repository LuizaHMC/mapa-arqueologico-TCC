const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now()+ "_" + file.originalname);
    }
});

const upload = multer({ 
    storage, 
    limits: { fileSize: 1024 * 1024 * 5 }, 
}).single('foto');

module.exports = upload;

