const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).json({ message: error });
    }

    req.user = user;
    next();
  });
};

module.exports = authenticate;
