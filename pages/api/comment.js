import connectDB from "../../middleware/mongodb";
import jwt from "jsonwebtoken";
import { getCookie } from "cookies-next";
import Comment from "../../models/comment";
import Project from "../../models/project";
import Profile from "../../models/profile";

const handler = async (req, res) => {
  if (req.method === "GET") {
    // const { project_id } = req.body;
    // const token = getCookie('devshowcase_jwt', { req, res });

    // if (token) {
    // try {
    // const user_id = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // const comments_list = await Comment.find({ project_id });
    const { project_id } = req.headers;
    const comments_list = Comment.findById(project_id)
      .populate({
        path: "profile_id",
        model: Profile,
      })
      .exec((err, result) => {
        if (err)
          res
            .status(201)
            .json({ status: "fail", message: "User not Authorized" });
        res
          .status(201)
          .json({
            status: "success",
            data: result,
            message: "Comments Successfully fetched",
          });
      });

    //     res.status(201).json({ status: "success", data: comments_list, message: 'Comments Successfully fetched' });
    // } catch {
    //     res.status(201).json({ status: "fail", message: 'User not Authorized' });
    // }

    // } else {
    //     res.status(201).json({ status: "fail", message: 'User not Authenticated' });

    // }
  } else if (req.method === "POST") {
    const { project_id, content } = req.body;
    const token = getCookie("devshowcase_jwt", { req, res });

    if (token) {
      try {
        const user_id = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const comment = new Comment({
          user_id: user_id.id,
          project_id,
          content,
        });

        const projectComment = await comment.save();
        const project = await Project.findByIdAndUpdate(
          { _id: project_id },
          {
            $push: {
              comments: projectComment._id,
            },
          },
          {
            new: true,
            useFindAndModify: false,
          }
        );

        res
          .status(201)
          .json({
            status: "success",
            user_id: user_id.id,
            project: project,
            comment: projectComment,
            message: "Comment Successfully added",
          });
      } catch (error) {
        res
          .status(201)
          .json({
            status: "fail",
            message: "User not Authorized",
            error: error.message,
          });
      }
    } else {
      res
        .status(201)
        .json({ status: "fail", message: "User not Authenticated" });
    }
  }
};

export default connectDB(handler);
