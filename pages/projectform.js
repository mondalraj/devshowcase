import Head from "next/head";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import ImageUpload from "../components/imageUpload";
import ProjectTagsInput from "../components/projectTagsInput";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dev = process.env.NODE_ENV !== "production";
const server = dev
  ? "http://localhost:3000"
  : "https://devshowcase-22.vercel.app";

export async function getServerSideProps({ query, req }) {
  if (query == undefined || query.referer == undefined) {
    return {
      notFound: true,
    };
  }
  const userRes = await fetch(`${server}/api/getUser`, {
    method: "GET",
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Cookie: req.headers.cookie,
    },
  });

  const userData = await userRes.json();

  if (!query.edit) {
    return {
      props: {
        userData,
        query,
      },
    };
  }

  const projectRes = await fetch(`${server}/api/projects`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      project_id: query.id,
    },
  });

  const Data = await projectRes.json();

  return {
    props: {
      userData,
      Data,
      query,
    },
  };
}

export default function projectform(props) {
  const [projectData, setProjectData] = useState({
    projectName: "",
    desc: "",
    github: "",
    live: "",
  });

  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [deleteFiles, setDeleteFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [profileId, setProfileId] = useState("");
  const [projectID, setProjectID] = useState("");
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const edit = router.query.edit ? true : false;

  useEffect(() => {
    if (props.userData.status == "fail") {
      router.push("/login");
    } else if (
      props.query.referer.toString() !== props.userData.user.profile_id._id
    ) {
      router.back();
    }
    setProfileId(props.userData.user.profile_id._id);

    if (!props.query.edit) {
      return;
    }
    setProjectID(props.query.id);
    setAcceptedFiles(props.Data.project.images);
    setProjectData({
      projectName: props.Data.project.name,
      desc: props.Data.project.description,
      github: props.Data.project.github_link,
      live: props.Data.project.live_link,
    });
    setTags(props.Data.project.tags);
  }, []);

  const handleChange = (e) => {
    const newData = { ...projectData };
    newData[e.target.id] = e.target.value;
    setProjectData(newData);
  };

  const getBase64 = async () => {
    const promises = acceptedFiles.map((file) => {
      if (typeof file == "string") return file;
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    });
    const images = await Promise.all(promises);
    return images;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (acceptedFiles.length == 0) {
      toast.error("Image is required");
      return;
    }

    const imagesArray = await getBase64(acceptedFiles);
    setLoading(true);

    const res = await fetch("/api/projects", {
      method: edit ? "PATCH" : "POST",
      body: JSON.stringify({
        name: projectData.projectName,
        imagesArray: imagesArray,
        description: projectData.desc,
        tags: tags,
        github_link: projectData.github,
        live_link: projectData.live,
        profile_id: profileId,
        deleteFiles: deleteFiles,
        project_id: projectID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await res.json();
    setLoading(false);

    if (data.error) {
      toast.error(data.error);
    } else {
      router.push(`/project/${projectID || data.project._id}`);
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
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl my-5 text-blue-500 font-bold">
          Add a new project
        </h1>
        <form onSubmit={handleSubmit} className="w-5/6 md:w-1/2 flex flex-col">
          <ImageUpload
            SetFiles={setAcceptedFiles}
            filesArray={acceptedFiles}
            DeleteFiles={setDeleteFiles}
          />
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
                required
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
                minLength={30}
                maxLength={500}
                required
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
          {!isLoading && (
            <div className="flex justify-center items-center mb-5">
              <input
                type="submit"
                value="Submit"
                className=" bg-blue-500 shadow-lg max-w-sm shadow-blue-500/50 rounded-lg px-10 py-3 text-white font-bold cursor-pointer hover:scale-110 transform duration-200"
              />
            </div>
          )}
          {isLoading && (
            <div className="flex justify-center items-center mb-5">
              <button
                type="submit"
                value="Processing..."
                className=" bg-blue-500 shadow-lg max-w-sm shadow-blue-500/50 rounded-lg px-10 py-3 text-white font-bold cursor-pointer hover:scale-110 transform duration-200 animate-spin"
                disabled
              >
                <svg
                  role="status"
                  className="inline w-4 h-4 mr-3 text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
                Processing...
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
