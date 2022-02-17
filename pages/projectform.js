import Head from "next/head";
import { Icon } from "@iconify/react";
import { useState } from "react";
import ImageUpload from "../components/imageUpload";
import ProjectTagsInput from "../components/projectTagsInput";
import HireUsModal from "../components/hireUsModal";

export default function projectform() {
  const [desc, setDesc] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");

  return (
    <div>
      <Head>
        <title>Project Form</title>
      </Head>
      {openModal && <HireUsModal />}
      <div className="w-full bg-zinc-400/50 h-10 flex items-center justify-end">
        <Icon
          icon="entypo:cross"
          className="text-neutral-700 mr-3 text-2xl cursor-pointer"
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl my-5 text-blue-500 font-bold">
          Add a new project
        </h1>
        <form className="w-5/6 md:w-1/2 flex flex-col">
          <ImageUpload />

          <div className="mb-5 w-full">
            <h2 className="text-2xl font-medium px-3 mb-5">
              Write some description about your project
            </h2>
            <div className="flex items-center justify-center my-3 mx-5">
              <textarea
                className="placeholder:italic placeholder:text-slate-400 block bg-gray-200/25 w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm md:w-3/4 h-40"
                placeholder="Write anything..."
                style={{ resize: "none" }}
                value={desc}
                onInput={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>

          <ProjectTagsInput />

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
                  value={githubLink}
                  onInput={(e) => setGithubLink(e.target.value)}
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
                  value={liveLink}
                  onInput={(e) => setLiveLink(e.target.value)}
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
