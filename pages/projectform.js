import Head from "next/head";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import ImageUpload from "../components/imageUpload";
import ProjectTagsInput from "../components/projectTagsInput";
import uploadImage from "../utils/Image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function projectform() {
  const [projectData, setProjectData] = useState({
    projectName: "",
    desc: "",
    github: "",
    live: "",
  });

  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [profileId, setProfileId] = useState("");
  const router = useRouter();

  useEffect(async () => {
    if (!router.isReady) return;

    if (router.query == undefined || router.query.referer == undefined) {
      router.push("/404");
      return;
    }

    const response = await fetch("/api/getUser", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await response.json();
    const id = router.query.referer;

    console.log(data);

    if (data.status != "fail") setProfileId(data.user.profile_id._id);

    if (data.status == "fail" || id == undefined) {
      router.push("/login");
    } else if (id.toString() !== data.user.profile_id._id) {
      router.back();
    }
  }, [router.isReady]);

  const handleChange = (e) => {
    const newData = { ...projectData };
    newData[e.target.id] = e.target.value;
    setProjectData(newData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagesArray = await uploadImage(e, acceptedFiles);
    const res = await fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify({
        name: projectData.projectName,
        images: imagesArray,
        description: projectData.desc,
        tags: tags,
        github_link: projectData.github,
        live_link: projectData.live,
        profile_id: profileId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await res.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      router.push(`/project/${data.project._id}`);
    }
  };

  return (
    <div>
      <Head>
        <title>Project Form</title>
      </Head>
      <div className="w-full bg-zinc-400/50 h-10 flex items-center justify-end">
        <Icon
          icon="entypo:cross"
          className="text-neutral-700 mr-3 text-2xl cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl my-5 text-blue-500 font-bold">
          Add a new project
        </h1>
        <form onSubmit={handleSubmit} className="w-5/6 md:w-1/2 flex flex-col">
          <ImageUpload SetFiles={setAcceptedFiles} filesArray={acceptedFiles} />
          <div className="mb-5 w-full">
            <h2 className="text-2xl font-medium px-3 mb-5">Project Name</h2>
            <div className="flex items-center justify-center my-3 mx-5">
              <input
                type={"text"}
                className="placeholder:italic placeholder:text-slate-400 block bg-gray-200/25 w-full border border-slate-300 rounded-md p-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm md:w-3/4"
                placeholder="Enter name of project"
                id="projectName"
                value={projectData.projectName}
                onInput={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className="mb-5 w-full">
            <h2 className="text-2xl font-medium px-3 mb-5">
              Write some description about your project
            </h2>
            <div className="flex items-center justify-center my-3 mx-5">
              <textarea
                className="placeholder:italic placeholder:text-slate-400 block bg-gray-200/25 w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm md:w-3/4 h-40"
                placeholder="Write anything..."
                id="desc"
                style={{ resize: "none" }}
                value={projectData.desc}
                onInput={(e) => handleChange(e)}
              />
            </div>
          </div>

          <ProjectTagsInput
            setTags={setTags}
            profileFormTags={false}
            tags={tags}
          />

          <div className="mb-5 w-full">
            <h2 className="text-2xl font-medium px-3 mb-5">Project Links</h2>
            <div className="flex flex-col items-center justify-center">
              <div className="flex justify-center items-center my-3 mx-5 w-full">
                <label htmlFor="github" className="mx-2 md:mx-5">
                  <Icon
                    icon="carbon:logo-github"
                    className="text-3xl md:text-4xl"
                  />
                </label>
                <input
                  type="text"
                  id="github"
                  className="px-5 py-2 w-3/4 md:w-2/3 rounded-full placeholder:italic placeholder:text-slate-400 block bg-gray-200/25 border border-slate-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm"
                  placeholder="Github Link here"
                  value={projectData.github}
                  onInput={(e) => handleChange(e)}
                />
              </div>
              <div className="flex justify-center items-center my-3 mx-5 w-full">
                <label htmlFor="live" className="mx-2 md:mx-5">
                  <Icon
                    icon="fluent:live-24-filled"
                    className="text-3xl md:text-4xl"
                  />
                </label>
                <input
                  type="text"
                  id="live"
                  className="px-5 py-2 w-3/4 md:w-2/3 rounded-full placeholder:italic placeholder:text-slate-400 block bg-gray-200/25 border border-slate-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm"
                  placeholder="Live site Link here"
                  value={projectData.live}
                  onInput={(e) => handleChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mb-5">
            <input
              type="submit"
              value="Submit"
              className=" bg-blue-500 shadow-lg max-w-sm shadow-blue-500/50 rounded-lg px-10 py-3 text-white font-bold cursor-pointer hover:scale-110 transform duration-200"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
