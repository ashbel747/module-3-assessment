const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

//@desc Register a user
//@route POST /auth/signup
//@access public
const registerUser = asyncHandler(async  (req, res) => {
    const {username, email, password } = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable) {
        res.status(400);
        throw new Error("User already exist")
    }

    //hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({
            message: "User registered successfully!",
            user: {
                _id: user.id,
                email: user.email,
        },
    });
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
});

//@desc Login a user
//@route POST /auth/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const{ email, password } = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error ("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare password with hasshedpassword
    if(user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email:user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30m"}
    );
        res.status(200).json({ accessToken });
    } else{
        res.status(401)
        throw new Error("email or password is not valid");
    }
});

//@desc Reset password
//@route POST /auth/reset-password
//@access private
const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and new password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//@desc Current user
//@route GET /auth/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {registerUser, loginUser, resetPassword, currentUser};