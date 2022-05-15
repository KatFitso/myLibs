const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({ err: "Unauthorized", msg: "No token found" });
  }

  const token = req.headers.authorization;
  const userId = jwt.verify(token, process.env.JWT_SECRET);

  req.userId = userId;
  next();
};

module.exports = authMiddleware;
