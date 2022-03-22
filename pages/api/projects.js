import connectDB from "../../middleware/mongodb";
import Project from "../../models/project";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { images, description, tags, github_link, live_link } = req.body;
    const new_project = new Project({
      description,
      images,
      tags,
      github_link,
      live_link,
    });
    try {
      await new_project.save();
      return res
        .status(201)
        .json({ status: "success", message: "Project has successfully added" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(422).json({ message: "req_method_not_supported" });
  }
};

export default connectDB(handler);
