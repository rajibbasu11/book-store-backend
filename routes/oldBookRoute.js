const express = require('express');
const router = express.Router();
const oldBookController = require('../controllers/oldBookController');

router.use('/getAll', oldBookController.getAllOldBooks);

router.use('/addNew', oldBookController.addOldBook);

module.exports = router;