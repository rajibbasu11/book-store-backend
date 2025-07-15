const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User signup
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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log({ users });
    if (users) {
      res
        .status(200)
        .json({ data: users, message: `${users.length} user/users found` });
    } else {
      res.status(400).json({ message: "No User Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
