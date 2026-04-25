const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized. Token is missing.");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      res.status(401);
      throw new Error("Not authorized. Admin account not found.");
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (res.statusCode === 200) {
      res.status(401);
    }

    next(error);
  }
};

module.exports = { protect };
