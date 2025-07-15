const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const userRoutes = require("./user");
const authRoutes = require("./auth");
// const bookRoutes = require("./book");
// const authorRoutes = require("./author");
// const genreRoutes = require("./genre");
// const publisherRoutes = require("./publisher");

router.use("/users", authMiddleware, userRoutes);
router.use("/auth", authRoutes);
// router.use("/books", bookRoutes);
// router.use("/authors", authorRoutes);
// router.use("/genres", genreRoutes);
// router.use("/publishers", publisherRoutes);

module.exports = router;
