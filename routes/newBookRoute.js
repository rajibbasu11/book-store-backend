const express = require('express');
const router = express.Router();
const newBookController = require('../controllers/newBookController'); 

router.get('/getAll', newBookController.getAllNewBooks);

router.post('/addNew', newBookController.addNewBook);

module.exports = router;