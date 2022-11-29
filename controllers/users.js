import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

// Only for development use
let SALT_ROUNDS = 11;
let TOKEN_KEY = "areallylonggoodkey";

// Production use
if (process.env.NODE_ENV === "production") {
  SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
  TOKEN_KEY = process.env.TOKEN_KEY;
}

const today = new Date();
const exp = new Date(today);
exp.setDate(today.getDate() + 30);

export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please fill in all required fiedlds");
    }

    if (password.length < 6) {
      res.status(400);
      throw new Error("Password must be up to 6 characters");
    }

    const userEmailExists = await User.findOne({ email });
    if (userEmailExists) {
      res.status(400);
      throw new Error("Email has already been registered");
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      res.status(400);
      throw new Error("Username already exists");
    }

    const password_digest = await bcrypt.hash(password, SALT_ROUNDS);
    const user = new User({
      username,
      email,
      password_digest,
      playlists: [],
    });

    await user.save();

    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
      playlists: [],
      exp: parseInt(exp.getTime() / 1000),
    };

    const token = jwt.sign(payload, TOKEN_KEY);
    res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select(
      "username email password_digest"
    );
    if (await bcrypt.compare(password, user.password_digest)) {
      const payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        playlists: user.playlists,
        exp: parseInt(exp.getTime() / 1000),
      };

      const token = jwt.sign(payload, TOKEN_KEY);
      res.status(201).json({ token });
    } else {
      res.status(401).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const verify = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, TOKEN_KEY);
    if (payload) {
      res.json(payload);
    }
  } catch (error) {
    console.log(error.message);
    res.status(401).send("Not Authorized");
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userid).populate(
      "playlists",
      "videos"
    );
    res.json(user);
  } catch (error) {
    res.status(400).send("User cannot be found");
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("playlists");
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("can't get users!");
  }
};
export const changePassword = async (req, res) => {};
