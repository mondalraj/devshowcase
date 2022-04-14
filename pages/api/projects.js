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
    const {project_id} = req.body;
    try{
      const project = await Project.findOne({ _id: project_id });
      res.status(201).json({ status: "success", project: project });
    } catch{
      res.status(201).json({ status: "fail", message: 'Project Not found' });
    }
  }
};

export default connectDB(handler);
