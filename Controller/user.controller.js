const User = require("../Model/user.schema");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const mailTo = require("../Mail/SendMail");

const signUp = async (req, res) => {
  try {
    const { userName, email, mobile, password } = req.body;

    const checkEmail = await User.findOne({email:email})
    if(checkEmail){
        return res.json({status:0,message:"Email already Taken"})
    }

    let hashPassword = await bcrypt.hash(password, 10); // string,salt

    let data = {
      userName,
      email,
      mobile,
      password: hashPassword,
    };

    const saveUser = await User.create(data); //null

    if (!saveUser) {
      return res.json({ status: 0, message: "User Not  Created" });
    }

    res.json({ status: 1, message: "User Created Successfully" });
  } catch (error) {
    console.log("user.controller.js/signUp ---->error", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ status: 0, message: "All Credential needed" });
    }
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return res.json({ status: 0, message: "No user found" });
    }
    const comparePassword = await bcrypt.compare(password, checkUser.password); // frontend pass,mongodb pass
    if (!comparePassword) {
      return res.json({ status: 0, message: "Invalid Password" });
    }
    let token = jwt.sign({userId:checkUser._id,userName:checkUser.userName,email:checkUser.email},"ABcd123",{expiresIn:'1hr'});// exp

    res.json({ status: 1, message: "Login Successfully",token:token ,user:checkUser}); //token
  } catch (error) {
    console.log("user.controller.js/login ---->error", error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.json({ status: 0, message: "Email required" });
    }
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return res.json({ status: 0, message: "No User found" });
    }
    let otp = Math.floor(1000 + Math.random() * 9000); //4 digit
    let otpTimeStamp = Date.now() + 300000;
    // let otpTimeStamp = Date.now() +300000 //5mins
    const updateUser = await User.updateOne(
      { _id: checkUser._id },
      { otp: otp, otpTimeStamp: otpTimeStamp }
    );
    if (!updateUser) {
      return res.json({ status: 0, message: "Otp could not be sent" });
    }
    let subject =  `Your One Time Password is ${otp}`
    let content = `Dear ${checkUser.userName}, Your One Time Password is ${otp}- It is Valid for  next 5 minutes.`
    mailTo(checkUser.email,subject,content)
    res.json({ status: 1, message: `Otp sent to your mail -${otp} ` });
  } catch (error) {
    console.log("user.controller.js/forgotPassword ---->error", error);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email) {
      return res.json({ status: 0, message: "Email required" });
    }
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return res.json({ status: 0, message: "No User found" });
    }
    if (Date.now() < checkUser.otpTimeStamp) {
      if (Number(otp) === checkUser.otp) {//NUmber===Number
        const updateUser = await User.updateOne(
          { _id: checkUser._id },
          { isOtpVerified: true }
        );
        if (!updateUser) {
          return res.json({ status: 0, message: "OTP not verified" });
        }
        return res.json({ status: 1, message: "OTP Verified Successfully" });
      } else {
        return res.json({ status: 0, message: "OTP is not matched" });
      }
    } else {
      return res.json({ status: 2, message: "OTP Expired" });
    }
  } catch (error) {
    console.log("user.controller.js/verifyOtp ---->error", error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;
    if (!email) {
      return res.json({ status: 0, message: "Email required" });
    }
    const checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return res.json({ status: 0, message: "No User found" });
    }
    if (checkUser.isOtpVerified) {
      if (newPassword === confirmPassword) {
        let hashPassword = await bcrypt.hash(newPassword, 10);
        const updateUser = await User.updateOne(
          { _id: checkUser._id },
          { password: hashPassword ,isOtpVerified:false}
        );
        if (!updateUser) {
          return res.json({ status: 0, message: "New Password not updated" });
        }
        return res.json({
          status: 1,
          message: "Password Updated Successfully",
        });
      } else {
        return res.json({ status: 0, message: "Password Doesn't match" });
      }
    } else {
      return res.json({ status: 0, message: "OTP verification Required" });
    }
  } catch (error) {
    console.log("user.controller.js/resetPassword ---->error", error);
  }
};

const allUser = async (req, res) => {
  try {
    const users = await User.find(); //All Data
    if (!users) {
      return res.json({ status: 0, message: "Users not found" });
    }
    res.json({ status: 1, response: users });
  } catch (error) {
    console.log("user.controller.js/allUser ---->error", error);
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ status: 0, message: "User Id Required in Params" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.json({ status: 0, message: "User not found" });
    }

    res.json({ status: 1, response: user });
  } catch (error) {
    console.log("user.controller.js/getSingleUser ---->error", error);
  }
};

const getOneUser = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.json({ status: 0, message: "User Id Required in Params" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.json({ status: 0, message: "User not found" });
    }

    res.json({ status: 1, response: user });
  } catch (error) {
    console.log("user.controller.js/getOneUser ---->error", error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({ status: 0, message: "User Id Required in Params" });
    }

    const user = await User.findByIdAndDelete(id);
    console.log("user", user);
    if (!user) {
      return res.json({ status: 0, message: "User not Deleted" });
    }

    res.json({ status: 1, message: "Deleted Successfully" });
  } catch (error) {
    console.log("user.controller.js/deleteUser ---->error", error);
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({ status: 0, message: "User Id Required in Params" });
    }
    const user = await User.findByIdAndUpdate(id, req.body);
    console.log("user", user);
    if (!user) {
      return res.json({ status: 0, message: "User not Updated" });
    }

    res.json({ status: 1, message: "updated Successfully" });
  } catch (error) {
    console.log("user.controller.js/editUser ---->error", error);
  }
};

const updateAllUsers = async (req, res) => {
  try {
    const { role, password } = req.body;
    if (!role) {
      return res.json({ status: 0, message: "No Roles" });
    }
    const updateMany = await User.updateMany({}, { role: role });
    console.log(updateMany);
    if (!updateMany.acknowledged || !updateMany) {
      return res.json({ status: 0, message: "Not updated" });
    }
    res.json({ status: 1, message: "All user Updated" });
  } catch (error) {
    console.log("user.controller.js/updateAllUsers ---->error", error);
  }
};

module.exports = {
  signUp,
  allUser,
  getSingleUser,
  getOneUser,
  deleteUser,
  editUser,
  updateAllUsers,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
