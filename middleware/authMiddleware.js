const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json("User Unauthorized!");
  }

  try {
    const token = authHeader.split(" ")[1];
    const userData = jwt.verify(
      token,
      process.env.JWT_SECRET || "this is a secret"
    );

    req.user = userData;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
