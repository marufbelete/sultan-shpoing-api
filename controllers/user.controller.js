const User = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const secret=require('../config.json')

//signup
exports.saveUser = async (req, res, next) => {
  try {
    const username= req.body.username
    const password=req.body.password
    const confirmpassword=req.body.confirmpassword

    if (!username || !password || !confirmpassword) {
      const error = new Error("Please fill all field.")
      error.statusCode = 400
      throw error;
    }
   
      const anyusername = await User.findOne({ where: { username: username} })
      console.log(anyusername)
    if (anyusername) {
      const error = new Error("user-name is already in use")
      error.statusCode = 400
      throw error;
    }
    if (password!==confirmpassword) {
      const error = new Error("password must match")
      error.statusCode = 400
      throw error;
    }
    if (password.length < 5) {
      const error = new Error("the password need to be atleast 5 charcter long.")
      error.statusCode = 400
      throw error;
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
   
    const user=await User.create({
      username: username,
      password: passwordHash,
    }) 
    console.log("in")
    console.log(user.username)
    const token = jwt.sign({ sub: user._id, username: user.username },secret.SECRET);
    return res.json({
      token
    });
  }
  catch(error) {
    next(error)
  }
};

//log in
exports.loginUser = async (req, res, next) => {
  try {
    const username=req.body.username;
    const password = req.body.password
    if (!username || !password) {
      const error = new Error("Please fill all field.")
      error.statusCode = 400
      throw error;
    }
    const user = await User.findOne({
      where:{ username: username}
    });
    if (!user) {
      const error = new Error("No account with this user-name exist")
      error.statusCode = 400
      throw error;
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      const error = new Error("Invalid credential.")
      error.statusCode = 400
      throw error;
    }
    const token = jwt.sign({ sub: user._id, username: user.username }, secret.SECRET);
    res.json({
      token
    });
  }
  catch(error) {
    next(error)
  }
};
//update user info
exports.updateUser = async (req, res, next) => {
  try {
    const password=req.body.password
    const confirmpassword=req.body.confirmpassword
    const id=req.user.sub;
    let passwordHash
    let updateinfo={}
if (password!==confirmpassword) {
      const error = new Error("password must match")
      error.statusCode = 400
      throw error;
    }
if(password)
{
    if (password.length < 5) {
      const error = new Error("the password need to be atleast 5 charcter long.")
      error.statusCode = 400
      throw error;
    }
    const salt = await bcrypt.genSalt();
    passwordHash = await bcrypt.hash(password, salt);
    updateinfo.password=passwordHash
  } 
   await User.update(
    updateinfo,
    { where: { _id: id } })
   res.json("password updates successfully")
  }
  catch(error) {
    next(error)
  }
};
