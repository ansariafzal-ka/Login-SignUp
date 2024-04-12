const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userControllers = {
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    console.log(name, email, password);

    try {
      const user = await User.findOne({ email: email });

      if (user) {
        return res
          .status(409)
          .json({ message: "user already registered with this email" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      res.status(201).json({
        message: "user created successfully",
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      });
    } catch (error) {
      console.error("Error in registerUser:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "300s",
      });

      res.status(200).json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        },
        token: token,
      });
    } catch (error) {
      console.log(error);
    }
  },
  sendUserData: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId);
      const userData = {
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      };
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ message: "error fetching user data" });
    }
  },
};

module.exports = userControllers;
