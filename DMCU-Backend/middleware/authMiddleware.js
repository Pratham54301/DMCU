const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const User = require("../models/User");

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized. Token is missing.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Try finding admin first
    let account = await Admin.findById(decoded.id).select("-password");
    if (account) {
      req.admin = account;
      req.user = account; // For compatibility
      return next();
    }

    // Try finding user
    account = await User.findById(decoded.id).select("-password");
    if (account) {
      req.user = account;
      return next();
    }

    res.status(401);
    throw new Error("Not authorized. Account not found.");
  } catch (error) {
    if (res.statusCode === 200) res.status(401);
    next(error);
  }
};

const admin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.admin)) {
    next();
  } else {
    res.status(403);
    next(new Error("Not authorized as an admin."));
  }
};

module.exports = { protect, admin };
