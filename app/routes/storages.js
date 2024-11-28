const express = require('express');
const router = express.Router();

const uploadMiddleware = require('../middlewares/multer');

const controllers = require('../controllers');

router.post('/', (req, res, next) => {
  uploadMiddleware.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ 
        success: false,
        message: err.message
      });
    }
    return next();
  });
}, controllers.uploadC);

router.delete('/:id', controllers.deleteC);

module.exports = router;
