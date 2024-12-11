import { User } from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User Controller
const registerUser = async (req, res, next) => {
  try {
    const { userName, userEmail, password, role } = req.body;

    // Validation check for empty fields
    if (!userName || !userEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({
      $or: [{ userEmail }, { userName }],
    });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists! Please login.",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      userName: userName.toLowerCase(),
      userEmail: userEmail.toLowerCase(),
      password: hashedPassword,
      role: role || "user", // Default role if not provided
    });

    // Remove password field from the returned user data
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res.status(500).json({
        success: false,
        message: "User creation failed! Please try again.",
      });
    }

    // Respond with success
    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { userEmail, password } = req.body;
    if (!userEmail || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Check if user exists
    const user = await User.findOne({ userEmail: userEmail.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found! Please register first.",
      });
    }

    // compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials! Please try again.",
      });
    }

    const accessToken = jwt.sign(
      {
        _id: user._id,
        userName: user.userName,
        userEmail: user.userEmail.toLowerCase(),
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      data: {
        accessToken,
        user: {
          _id: user._id,
          userName: user.userName,
          userEmail: user.userEmail.toLowerCase(),
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.log(error);
  }

  //
};

export { registerUser, loginUser };
