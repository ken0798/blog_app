const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const protect = asyncHandler(async function (req, res, next) {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT);
      // console.log(decode);
      req.user = await user.findById(decode.id);
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized Token");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Unauthorized Token");
  }
});

module.exports = protect;
