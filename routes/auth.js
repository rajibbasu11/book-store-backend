const express = require("express");
const router = express.Router();
const { addUser, login } = require("../controllers/user.controller");

router.post("/login", login);

module.exports = router;
