import connectDB from "../../middleware/mongodb";
import Comment from "../../models/comment";
import Profile from "../../models/profile";
import Project from "../../models/project";
import User from "../../models/user";
import validator from "validator";

const getHostname = (url) => {
  return new URL(url).hostname;
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      name,
      images,
      description,
      tags,
      github_link,
      live_link,
      profile_id,
    } = req.body;

    try {
      if (
        live_link &&
        !validator.isURL(live_link, { require_protocol: true })
      ) {
        throw Error("Live website link is not a valid URL");
      }

      if (
        github_link &&
        !validator.isURL(github_link, { require_protocol: true }) &&
        getHostname(github_link) != "github.com"
      ) {
        throw Error("This is not a valid URL or github link");
      }

      const new_project = new Project({
        name,
        description,
        images,
        tags,
        github_link,
        live_link,
        profile_id,
      });
      const newProject = await new_project.save();
      const userProfile = await Profile.findByIdAndUpdate(
        { _id: profile_id },
        {
          $push: {
            projects: newProject._id,
          },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      return res.status(201).json({
        status: "success",
        message: "Project has successfully added",
        project: newProject,
        userProfile: userProfile,
      });
    } catch (error) {
      return res.status(500).json({ error: `Project ${error.message}` });
    }
  } else if (req.method === "GET") {
    const { project_id } = req.headers;
    return new Promise((resolve, reject) => {
      const project = Project.findById(project_id)
        .populate({
          path: "profile_id",
          model: Profile,
          populate: {
            path: "user_id",
            model: User,
          },
        })
        .populate({
          path: "comments",
          model: Comment,
        })
        .exec((err, result) => {
          if (err)
            return res
              .status(404)
              .json({ status: "fail", message: "Project Not found" });
          return res.status(201).json({ status: "success", project: result });
        });
      return res.status(200);
    });
  }
};

export default connectDB(handler);
