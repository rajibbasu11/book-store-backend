const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  updateUserById,
  removeUser,
  addUser,
  changePassword,
} = require("../controllers/user.controller");

//all the user router
router.get("/get-all-users", getAllUsers);
router.put("/update-user-by-id/:id", updateUserById);
router.delete("/remove-user/:id", removeUser);
router.post("/add-user", addUser);
router.put("/change-password", changePassword);

module.exports = router;
