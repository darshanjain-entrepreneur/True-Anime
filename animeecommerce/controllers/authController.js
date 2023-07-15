import userModels from "../models/userModels.js";
import { hashPassword } from "../helpers/authHelper.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;

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

    const existingUser = await userModels.findOne({ email });

    if (existingUser) {
      return res.status(200).send({
        success: true,
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
