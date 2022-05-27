import connectDB from "../../middleware/mongodb";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { setCookies } from "cookies-next";
import User from "../../models/user";

const MAX_AGE = 7 * 24 * 60 * 60;

const createJWT = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: MAX_AGE,
  });
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;
    const emailExist = await User.findOne({ email });
    const userExist = await User.findOne({ username });
    if (emailExist) {
      return res
        .status(400)
        .json({
          status: "fail",
          error: "emailError",
          message: "Email is already registered",
          isLoggedIn: false,
        });
    }
    if (userExist) {
      return res
        .status(400)
        .json({
          status: "fail",
          error: "userExist",
          message: "Username already exists",
          isLoggedIn: false,
        });
    }

    try {
      const salt = await bcrypt.genSalt();
      var passwordhash = await bcrypt.hash(password, salt);
      const user = await User.create({
        username,
        email,
        password: passwordhash,
      });

      const token = createJWT(user._id);
      setCookies("devshowcase_jwt", token, {
        req,
        res,
        maxAge: 60 * 60 * 24 * 7,
      });

      return res
        .status(200)
        .json({
          status: "success",
          message: "User has successfully registered",
          isLoggedIn: true,
          user: user,
        });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(422).json({ message: "req_method_not_supported" });
  }
};

export default connectDB(handler);
