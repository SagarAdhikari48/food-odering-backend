import { Request, Response } from "express";
import User from "../models/user";

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.query;
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(currentUser);
  } catch (error) {
    console.error("Error getting current user:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).json(existingUser.toObject());
    }

    const newUser = new User(req.body);
    await newUser.save();
    return res.status(201).json(newUser.toObject());
  } catch (error) {
    console.error("Error creating current user:", error);
    return res.status(500).json({ message: "Error creating current user" });
  }
};

const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.sendStatus(404).json({ message: "User not found" });
    }
    user.name = name;
    user.addressLine1 = addressLine1;
    user.country = country;
    user.city = city;
    await user.save();
    return res.send(user);
  } catch (error) {
    console.log("Error updating current user:", error);
    res.status(500).json({ message: "Error updating current user" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
