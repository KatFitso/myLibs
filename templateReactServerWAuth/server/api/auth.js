const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

const findUser = async (req, res) => {
  const { token } = req.body;
  const userId = jwt.verify(token, process.env.JWT_SECRET);
  res.json(userId);
};

const userSignup = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email.match(emailRegex))
      return res.json({
        status: 406,
        err: "Not Acceptable",
        msg: "Must be a valid email",
      });
    if (password.length < 6)
      return res.json({
        status: 406,
        err: "Not Acceptable",
        msg: "Password must be 6 chars or longer",
      });

    let user = await UserModel.findOne({ email });
    if (user)
      return res.json({
        status: 406,
        err: "Not Acceptable",
        msg: "That email is already taken",
      });

    user = new UserModel({ email, password });
    user.password = await bcrypt.hash(user.password, 10);

    await user.save();

    const payload = { userId: user._id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        else res.json({ userId: user._id, token });
      }
    );
  } catch (error) {
    return res.status(500).send("error in userSignup");
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (!user)
      return res.json({
        status: 406,
        err: "Not Acceptable",
        msg: "No user with that email exists",
      });

    const isPass = await bcrypt.compare(password, user.password);

    if (!isPass)
      return res.json({
        status: 406,
        err: "Not Acceptable",
        msg: "Incorrect Password",
      });

    const payload = { userId: user._id };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) throw err;
        return res.json({ userId: user._id, token });
      }
    );
  } catch (error) {
    return res.status(500).send("error in userSignup");
  }
};

router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);
router.route("/findUser").post(findUser);

module.exports = router;
