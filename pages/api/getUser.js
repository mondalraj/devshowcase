import connectDB from "../../middleware/mongodb";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";
import User from "../../models/user";
import Profile from "../../models/profile";

const handler = async (req, res) => {
  if (req.method === "GET") {
    return new Promise((resolve, reject) => {
      const token = getCookie("devshowcase_jwt", { req, res });
      if (token) {
        const user_id = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = User.findById(user_id.id)
          .populate({
            path: "profile_id",
            model: Profile,
          })
          .exec((err, result) => {
            if (err) {
              return res
                .status(201)
                .json({ status: "fail", message: "User not Authorized" });
            }
            return res.status(201).json({
              status: "success",
              user: result,
              message: "User is logged in",
            });
          });
      } else {
        res
          .status(201)
          .json({ status: "fail", message: "User not Authenticated" });
      }
    });
  } else {
    res.status(422).json({ message: "req_method_not_supported" });
  }
};

export default connectDB(handler);
