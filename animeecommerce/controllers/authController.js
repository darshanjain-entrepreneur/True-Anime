import userModels from "../models/userModels.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone no is Required" });
    }
    if (!answer) {
      return res.send({ error: "Answer is Required" });
    }

    const existingUser = await userModels.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModels({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    });

    user.save();
    return res.status(201).send({
      success: true,
      message: "User Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// login controller

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(200).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not Registered",
      });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).send({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(200).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!answer) {
      res.status(200).send({
        success: false,
        message: "answer is required",
      });
    }
    if (!newPassword) {
      res.status(200).send({
        success: false,
        message: "New Password is required",
      });
    }
    //check
    const user = await userModels.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashedPassword = await hashPassword(newPassword);
    await userModels.findByIdAndUpdate(user._id, { password: hashedPassword });
    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
