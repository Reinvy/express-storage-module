const express = require('express');
const router = express.Router();

const { singleFileMulter } = require('../middlewares/multer');

const getAllController = require('../controllers/getAll');
const getByIdController = require('../controllers/getById');
const uploadController = require('../controllers/upload');
const updateController = require('../controllers/update');
const destroyController = require('../controllers/destroy');

router.get('/', getAllController);
router.get('/:id', getByIdController);
router.post('/', singleFileMulter, uploadController);
router.put('/:id', singleFileMulter, updateController);
router.delete('/:id', destroyController);

module.exports = router;
