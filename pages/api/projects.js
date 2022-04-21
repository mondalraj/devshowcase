import connectDB from "../../middleware/mongodb";
import Profile from "../../models/profile";
import Project from "../../models/project";

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
  } else {
    const { project_id } = req.headers;
    try {
      const project = await Project.findOne({ _id: project_id })
      res.status(201).json({ status: "success", project: project });
    } catch {
      res.status(201).json({ status: "fail", message: "Project Not found" });
    }
  }
};

export default connectDB(handler);
