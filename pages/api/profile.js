import connectDB from "../../middleware/mongodb";
import User from "../../models/user";
import Profile from "../../models/profile";
import Project from "../../models/project";
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
    } = req.body;
    const profile = new Profile({
      image: images,
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
    try {
      if (website && !validator.isURL(website, { require_protocol: true })) {
        throw Error("Website is not a valid URL");
      }

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
  }
};

export default connectDB(handler);
