const asyncHandler = require("express-async-handler");
const userModel = require("../models/user");
const generateToken = require("../utils/genreateToken");

const createUser = asyncHandler(async function (req, res) {
  const { fname, lname, email, password, pic } = req.body;
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await userModel.create({
    fname,
    lname,
    email,
    password,
    pic,
  });
  if (user) {
    // const { fname, lname, email, password, pic } = user;
    res.status(200).json({
      message: "Successfully created",
    });
  } else {
    res.status(400);
    throw new Error("Error Occurred!");
  }
});

const logUser = asyncHandler(async function (req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      id: user._id,
      pic: user.pic,
      email: user.email,
      name: user.fname + " " + user.lname,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
});
module.exports = {
  createUser,
  logUser,
};
