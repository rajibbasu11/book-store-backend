const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Add new user
exports.addUser = async (req, res) => {
  const { name, email, password, address, phone } = req.body;
  try {
    // Checking existing user
    if (!name || !email || !password || !address || !phone) {
      res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingUser = await User.find({ email });
    if (existingUser.length > 0) {
      res.status(400).json({ message: "User Already Exists" });
    }
    const user = new User({ name, email, password, address, phone });
    await user.save();
    res.status(201).json({ message: "User Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
    } else {
      res.status(200).json({
        message: "Login Successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          isAdmin: user.isAdmin,
          token: jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || "this is a secret",
            { expiresIn: process.env.JWT_EXPIRY || "1d" }
          ),
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//get all user list
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("name email address phone isAdmin")
      .lean();
    if (users) {
      res.status(200).json({
        data: users,
        message: `${users.length} user${users.length > 1 ? "s" : ""} found`,
      });
    } else {
      res.status(400).json({ message: "No User Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateUserById = async (req, res) => {
  const id = req.params.id;
  const { name, phone, address } = req.body;

  try {
    const updatedUser = await User.updateOne(
      { _id: id },
      { name, phone, address }
    );
    if (!updatedUser.matchedCount) throw Error;
    res.status(202).json({ message: "user Updated!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.removeUser = async (req, res) => {
  const id = req.params.id;
  try {
    const resp = await User.deleteOne({ _id: id });
    res.status(200).json({ message: "user deleted!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.changePassword = async (req, res) => {
  const { newPassword, oldPassword, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) res.status(404).json("user not found!");

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) res.status(400).json({ message: "wrong password" });

    await User.updateOne(
      { email },
      { password: await bcrypt.hash(newPassword, 10) }
    );
    res.status(200).json({ message: "password changes" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
