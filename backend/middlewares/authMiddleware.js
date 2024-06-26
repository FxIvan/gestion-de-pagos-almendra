const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const unauthorized = (res) => {
  return res.status(401).json({ message: "Not authorized, token failed" });
};

const jwt_expired = (res) => {
  return res.status(401).json({ message: "Token expired" });
};

const bearerCondition = (req) => {
  return (
    req?.headers?.authorization &&
    req?.headers?.authorization.startsWith("Bearer")
  );
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return false;
  }
};

const protect = asyncHandler(async (req, res, next) => {
  if (bearerCondition(req)) addUser(req, res, next);
  else return unauthorized(res, "Not authorized, no token");
});

const addUser = asyncHandler(async (req, res, next) => {
  let token;
  try {
    if (bearerCondition(req)) {
      token = req.headers.authorization.split(" ")[1];
      if (token && token !== "null") {
        const result = verifyJWT(token);
        if (result) {
          req.user = await User.findByPk(result.id);
        } else {
          return jwt_expired(res);
        }
      }
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = { protect };
