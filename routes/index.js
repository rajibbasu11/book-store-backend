const express = require('express');
const router = express.Router();
const newBookRoute = require('./newBookRoute');
const oldBookRoute = require('./oldBookRoute');

router.use('/newBook', newBookRoute);
router.use('/oldBook', oldBookRoute);


module.exports = router;
