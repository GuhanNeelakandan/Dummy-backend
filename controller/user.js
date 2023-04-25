const User = require("./../model/user.modal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendmail");

const register = (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashpassword) => {
    if (err) {
      res.json({ error: err });
    }
    let user = await User.findOne({ email: req.body.email }); // email:jabez@gmail.com
    if (user) {
      res.json({
        status: 0,
        message: "Email Already Exist",
      });
    } else {
      user = new User({
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: hashpassword,
      });
      await user
        .save()
        .then((user) => {
          res.json({
            status: 1,
            message: "user added sucessfully",
          });
        })
        .catch((error) => {
          res.json({
            message: `an error occured------>${error}`,
          });
        });
    }
  });
};

const login = async (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  await User.findOne({ email: email }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.json({ error: err });
        }
        if (result) {
          let token = jwt.sign(
            { name: user.username, id: user._id },
            "tokenkey",
            { expiresIn: "1hr" }
          );
          res.json({
            status: 1,
            message: "Login successfully",
            token,
          });
        } else {
          res.json({
            status: 0,
            message: "check email and password",
          });
        }
      });
    } else {
      res.json({
        status: 0,
        message: "User  not found",
      });
    }
  });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.json({
      status: 0,
      message: "No user Found",
    });
  } else {
    const otp = Math.floor(1000 + Math.random() * 9000);
    sendMail("neelakandanguhan@gmail.com", "Verify OTP", `Your OTP --- ${otp}`);
    const updateUser = await User.findOneAndUpdate(
      { email: email },
      { otp: otp }
    );
    if (!updateUser) {
      res.json({
        status: 0,
        message: "Otp not sent",
      });
    } else {
      res.json({
        status: 1,
        message: "OTP sent to your mail",
      });
    }
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.json({
      status: 0,
      message: "No user Found",
    });
  } else {
    if (user.otp === otp) {
      const update = await User.findOneAndUpdate(
        { email: email },
        { otpVerified: true }
      );
      if (update) {
        res.json({
          status: 1,
          message: "OTP verified",
        });
      }
    } else {
      res.json({
        status: 0,
        message: "OTP Does not match",
      });
    }
  }
};


const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.json({
      status: 0,
      message: "No user Found",
    });
  } else {
    if (user.otpVerified) {
      bcrypt.hash(newPassword, 10, async (err, hashpassword) => {
        if (err) {
          res.json({ error: err });
        }
        const update = await User.findOneAndUpdate(
          { email: email },
          { password: hashpassword ,otpVerified:false}
        );
        if (update) {
          res.json({
            status: 1,
            message: "Password Changed",
          });
        }
      });
    } else {
      res.json({
        status: 0,
        message: "Otp not verified",
      });
    }
  }
};


module.exports = { register, login, forgotPassword, verifyOTP, resetPassword };
