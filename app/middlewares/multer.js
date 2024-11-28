const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb({ message: 'Unsupported file format' }, false);
    }
};

const multerMiddleware = multer({ storage: storage, limits: { fileSize: 1024 * 1024 * 10 }, fileFilter: fileFilter });

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