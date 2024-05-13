const express = require("express");
const {
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
} = require("../Controller/user.controller");
const auth = require("../middleware/auth");

const router = express.Router(); //api path

//Methods --->GET,POST,PUT,DELETE

router.post("/user/signup", signUp); //api--endpoint
router.post("/user/login", login); //api--endpoint
router.get("/all/users",auth,allUser);
router.get("/user/:id",auth,getSingleUser);
router.post("/get/user",auth,getOneUser);
router.delete("/remove/user/:id",auth,deleteUser);
router.put("/update/user/:id",auth,editUser);
router.post("/update/all/user",auth,updateAllUsers);
router.post("/forgot/password", forgotPassword);
router.post("/verify/otp", verifyOtp);
router.post("/reset/password", resetPassword);

module.exports = router;
