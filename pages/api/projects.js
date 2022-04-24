import connectDB from "../../middleware/mongodb";
import Comment from "../../models/comment";
import Profile from "../../models/profile";
import Project from "../../models/project";
import User from "../../models/user";

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
    const new_project = new Project({
      name,
      description,
      images,
      tags,
      github_link,
      live_link,
      profile_id,
    });
    try {
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
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const { project_id } = req.headers;
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
  }
};

export default connectDB(handler);
