import connectDB from "../../middleware/mongodb";
import Comment from "../../models/comment";
import Profile from "../../models/profile";
import Project from "../../models/project";
import User from "../../models/user";
import { uploadImage, deleteImage } from "../../utils/Image";
import validator from "validator";

const getHostname = (url) => {
  return new URL(url).hostname;
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      name,
      imagesArray,
      description,
      tags,
      github_link,
      live_link,
      profile_id,
      deleteImages,
      project_id,
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

      const images = await uploadImage(imagesArray);

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
      return res.status(400).json({ error: error.message });
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
  } else if (req.method === "PATCH") {
    const {
      name,
      imagesArray,
      description,
      tags,
      github_link,
      live_link,
      profile_id,
      deleteFiles,
      project_id,
    } = req.body;

    let images = [];

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

      if (deleteFiles.length != 0) {
        await deleteImage(deleteFiles);
      }

      if (imagesArray.length != 0) {
        images = await uploadImage(imagesArray);
      }

      const updates = {
        name,
        description,
        images,
        tags,
        github_link,
        live_link,
        profile_id,
      };

      const project = await Project.findByIdAndUpdate(
        { _id: project_id },
        updates,
        {
          new: true,
          useFindAndModify: false,
        }
      );
      return res.status(201).json({
        status: "success",
        message: "Project has successfully added",
        project: project,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  } else if (req.method == "DELETE") {
    const { project_id } = req.headers;
    try {
      const project = await Project.findByIdAndDelete({ _id: project_id });
      await deleteImage(project.images);
      const comments = await Comment.deleteMany({
        _id: { $in: project.comments },
      });
      const userProfile = await Profile.findByIdAndUpdate(
        { _id: project.profile_id },
        {
          $pull: {
            projects: project_id,
          },
        },
        { useFindAndModify: false }
      );
      return res
        .status(200)
        .json({ status: "success", message: "Project deleted Successfully" });
    } catch (error) {
      return res
        .status(404)
        .json({ status: "fail", message: "Project Not found" });
    }
  }
};

export default connectDB(handler);
