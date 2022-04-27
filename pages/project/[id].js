import Head from "next/head";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import Clipboard from "../../components/clipboard";
import CommentImage from "../../components/commentImage";
import ImageSlider from "../../components/imageSlider";
import HireUsModal from "../../components/hireUsModal";
import { useRouter } from "next/router";
import CommentSection from "../../components/commentSection";

function Project() {
  const [isModal, setIsModal] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [comments, setComments] = useState([]);

  const router = useRouter();

  useEffect(async () => {
    if (!router.isReady) return;

    const { id } = router.query;

    const res = await fetch("/api/projects", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        project_id: id,
      },
    });

    const data = await res.json();

    if (data.status == "fail") {
      router.push("/404");
    } else {
      setProjectData(data.project);
      setProfileData(data.project.profile_id);
      setComments(data.project.comments);
    }
  }, [router.isReady]);

  var tagsArray = projectData.tags;

  return (
    <div className="relative font-dm">
      <Head>
        <title>Project - {projectData.name}</title>

        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      {isModal && (
        <HireUsModal
          setModal={setIsModal}
          fromEmail={profileData.user_id.email}
        />
      )}
      <div className="w-full bg-zinc-400/50 h-10 flex items-center justify-end">
        <Icon
          icon="entypo:cross"
          className="text-neutral-700 mr-3 text-2xl cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      <div className="absolute top-[25rem] -right-[8.4rem] rotate-90 hidden md:block">
        {projectData.live_link != "" && (
          <button className="bg-neutral-200 hover:bg-blue-500 py-2 px-10 font-bold text-base text-slate-500 hover:text-white cursor-pointer">
            <a href={projectData.live_link} target="_blank">
              View Live
            </a>
          </button>
        )}
        {projectData.github_link != "" && (
          <button className="bg-neutral-200 hover:bg-blue-500 py-2 px-10 font-bold text-base text-slate-500 hover:text-white cursor-pointer">
            <a href={projectData.github_link} target="_blank">
              View Code
            </a>
          </button>
        )}
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center m-auto">
        <h1 className="font-bold text-2xl md:hidden mt-4 flex justify-start w-full px-5">
          {projectData.name}
        </h1>
        <div className="p-5 flex justify-between items-center w-full">
          <CommentImage size="headerImage" image={profileData.image} />
          <div className="flex flex-col w-full px-3  md:pl-5 md:pr-10">
            <h1 className="font-bold text-lg hidden md:block">
              {projectData.name}
            </h1>
            <div className="flex flex-col md:flex-row md:items-center">
              <h2 className="font-medium text-base">{profileData.name}</h2>
              <h2 className="text-xl px-1 hidden md:block">&bull;</h2>
              <h2
                className="text-blue-500 text-base hover:bg-blue-500 hover:text-white p-1 rounded-md cursor-pointer max-w-max"
                onClick={() => setIsModal(true)}
              >
                Hire Me
              </h2>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bg-zinc-200 w-10 h-10 rounded-sm mx-2 flex justify-center items-center cursor-pointer shadow-md">
              <Icon icon="icon-park-outline:like" className="text-3xl" />
            </div>
            <div className="bg-zinc-200 w-10 h-10 rounded-sm mx-2 flex justify-center items-center cursor-pointer shadow-md">
              <Clipboard router={router} />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <ImageSlider images={projectData.images} />
          <div className="flex md:hidden w-full">
            {projectData.live_link != "" && (
              <button className="bg-blue-500 w-1/2 p-3 font-bold text-lg text-white cursor-pointer">
                <a href={projectData.live_link} target="_blank">
                  View Live
                </a>
              </button>
            )}
            {projectData.github_link != "" && (
              <button className="bg-zinc-200 w-1/2 p-3 font-bold text-lg text-slate-500 cursor-pointer">
                <a href={projectData.github_link} target="_blank">
                  View Code
                </a>
              </button>
            )}
          </div>
          <div className="m-3 flex flex-col md:m-0 items-center md:w-2/3 w-full">
            <div className="flex justify-start p-1 md:p-1.5 flex-wrap font-medium">
              {tagsArray?.map((tag, id) => {
                return (
                  <h2
                    className="text-blue-500 border-2 border-blue-500 px-3 py-1 ml-2 md:mx-2 my-1 text-base rounded-md shadow-lg hover:shadow-blue-500 hover:text-white hover:bg-blue-500 hover:-translate-y-1 cursor-none"
                    key={id}
                  >
                    {tag}
                  </h2>
                );
              })}
            </div>
            <p className="flex justify-start px-1.5 pb-10 text-lg md:text-base border-b-2 border-b-slate-300">
              {projectData.description}
            </p>
            <div className="mb-20 w-full">
              <CommentSection
                projectId={router.query.id}
                comments={comments}
                setComments={setComments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
