
const jwt = require("jsonwebtoken");
const User = require("../models/schema");
const redisClient = require("../config/redis");

const protect = (roles = []) => {
  return async (req, res, next) => {
    try {

      
      const { token } = req.cookies;
      if (!token) return res.status(401).json({ message: "No token provided" });
     
      const payload = jwt.verify(token, process.env.JWT_KEY);

      const user = await User.findById(payload._id);
      if (!user) return res.status(401).json({ message: "User not found" });

      const isBlocked = await redisClient.exists(`token:${token}`);
      if (isBlocked)
        return res.status(401).json({ message: "Token blocked" });

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
};

module.exports = protect;

