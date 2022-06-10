import connectDB from "../../middleware/mongodb";
import User from "../../models/user";
import Profile from "../../models/profile";
import Project from "../../models/project";
import { uploadImage, deleteImage } from "../../utils/Image";
import deleteProject from "../../utils/deleteProject";
import validator from "validator";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {
      user_id,
      name,
      date,
      bio,
      location,
      company,
      work,
      school,
      course,
      tags,
      designation,
      images,
      website,
      linked_in,
      instagram,
      github,
      pic,
      id,
    } = req.body;
    try {
      if (website && !validator.isURL(website, { require_protocol: true })) {
        throw Error("Website is not a valid URL");
      }
      if (!designation) {
        throw Error("Designation is required");
      }

      const image = await uploadImage(images);

      const profile = new Profile({
        image: image[0],
        name: name,
        designation: designation,
        date_of_birth: date,
        bio: bio,
        location: location,
        company_name: company,
        work_description: work,
        university_name: school,
        course_name: course,
        skills: tags,
        user_id: user_id,
        linked_in: linked_in,
        instagram: instagram,
        github: github,
        website: website,
      });

      const userProfile = await profile.save();
      const user = await User.findByIdAndUpdate(
        { _id: user_id },
        {
          $set: {
            profile_id: userProfile._id,
          },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      return res.status(201).json({
        status: "success",
        message: "Profile Created Successfully",
        user: user,
        userProfile: userProfile,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const { profile_id } = req.headers;
    return new Promise((resolve, reject) => {
      const profile = Profile.findById(profile_id)
        .populate({ path: "projects", model: Project })
        .populate({
          path: "user_id",
          model: User,
        })
        .exec((err, result) => {
          if (err)
            return res
              .status(404)
              .json({ status: "fail", message: "User Profile Not found" });
          return res.status(201).json({ status: "success", user: result });
        });
      return res.status(200);
    });
  } else if (req.method === "PATCH") {
    const {
      user_id,
      name,
      date,
      bio,
      location,
      company,
      work,
      school,
      course,
      tags,
      designation,
      images,
      website,
      linked_in,
      instagram,
      github,
      pic,
      id,
    } = req.body;

    let image = [];

    try {
      if (website && !validator.isURL(website, { require_protocol: true })) {
        throw Error("Website is not a valid URL");
      }
      if (!designation) {
        throw Error("Designation is required");
      }

      if (images.length != 0 && pic != "") {
        await deleteImage([pic]);
      }
      if (images.length != 0) {
        image = await uploadImage(images);
      }

      const updates = {
        image: image[0],
        name: name,
        designation: designation,
        date_of_birth: date,
        bio: bio,
        location: location,
        company_name: company,
        work_description: work,
        university_name: school,
        course_name: course,
        skills: tags,
        user_id: user_id,
        linked_in: linked_in,
        instagram: instagram,
        github: github,
        website: website,
      };

      const user = await Profile.findByIdAndUpdate({ _id: id }, updates, {
        new: true,
        useFindAndModify: false,
      });

      return res.status(201).json({
        status: "success",
        message: "Profile Updated Successfully",
        user: user,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method == "DELETE") {
    const { profile_id } = req.headers;
    try {
      const profile = await Profile.findByIdAndDelete({ _id: profile_id });
      if (profile.projects.length != 0) {
        profile.projects.map(async (project_id) => {
          await deleteProject(project_id);
        });
      }

      if (profile.image) await deleteImage([profile.image]);

      const user = await User.deleteOne({ _id: profile.user_id });
      return res
        .status(200)
        .json({ status: "success", message: "User deleted Successfully" });
    } catch (error) {
      return res
        .status(404)
        .json({ status: "fail", message: "Profile Not found" });
    }
  }
};

export default connectDB(handler);
