const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser= require("../middleware/fetchuser");

const JWT_SECRET = "onelastride";
//Route 1:Create a User using : POST"/api/auth/createuser". Dosent require login

router.post(
  "/createuser",
  [
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email", "enter a valid Email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let sucess=false
    //if errors return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({sucess, errors: errors.array() });
    }
    try {
      //check weather user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({sucess, error: "sorry user with this mailID exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SECRET);
      sucess=true
      res.json({sucess, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

//Route 2:Auth a User using : POST"/api/auth/createuser". Dosent require login

router.post(
  "/login",
  [
    body("email", "enter a valid Email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    let sucess=false ;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentrials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        sucess=true
        return res
          .status(400)
          .json({ sucess, error: "Please try to login with correct credentrials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      sucess=true
      res.json({ sucess, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

//Route 3: Get logged in User using : POST"/api/auth/getuser". require login

router.post('/getuser', fetchuser , async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password")
      res.send(user)
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
      const token = req.header('auth-token');
    }
  }
)
module.exports = router;
