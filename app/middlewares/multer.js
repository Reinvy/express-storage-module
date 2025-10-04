const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../../public/uploads/');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const multerMiddleware = multer({ storage: storage, limits: { fileSize: 20 * 1024 * 1024 } });

const singleFileMulter = (req, res, next) => {
    multerMiddleware.single('file')(req, res, (err) => {
      if (err) {
        return res.status(500).json({ 
          success: false,
          message: err.message
        });
      }
      return next();
    });
  }

module.exports = {
    multerMiddleware,
    singleFileMulter,
};