import Head from "next/head";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import CommentImage from "../../components/commentImage";
import ImageSlider from "../../components/imageSlider";
import HireUsModal from "../../components/hireUsModal";
import { useRouter } from "next/router";

function Project() {
  const [text, setText] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [projectData, setProjectData] = useState({});
  const [profileData, setProfileData] = useState({});

  const router = useRouter();

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
    if (chosenEmoji !== null) {
      text += chosenEmoji.native;
      setText(text);
    }
  };

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

    console.log(data);

    if (data.status == "fail") {
      router.push("/404");
    } else {
      setProjectData(data.project);
    }

    if (data.status != "fail") {
      const profileRes = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          profile_id: data.project.profile_id,
        },
      });

      const profileData = await profileRes.json();

      if (profileData.status == "fail") {
        router.push("/404");
      } else {
        setProfileData(profileData.user);
      }
    }
  }, [router.isReady]);

  var tagsArray = projectData.tags;

  return (
    <div className="relative">
      <Head>
        <title>Project - {projectData.name}</title>
      </Head>
      {isModal && <HireUsModal setModal={setIsModal} />}
      <div className="w-full bg-zinc-400/50 h-10 flex items-center justify-end">
        <Icon
          icon="entypo:cross"
          className="text-neutral-700 mr-3 text-2xl cursor-pointer"
          onClick={() => router.back()}
        />
      </div>
      <div className="absolute top-1/3 -right-[8.4rem] rotate-90 hidden md:block">
        <button className="bg-neutral-200 hover:bg-blue-500 py-2 px-10 font-bold text-base text-slate-500 hover:text-white cursor-pointer">
          {projectData.live_link != null && (
            <a href={projectData.live_link} target="_blank">
              View Live
            </a>
          )}
        </button>
        <button className="bg-neutral-200 hover:bg-blue-500 py-2 px-10 font-bold text-base text-slate-500 hover:text-white cursor-pointer">
          {projectData.github_link != null && (
            <a href={projectData.github_link} target="_blank">
              View Code
            </a>
          )}
        </button>
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
                className="text-blue-500 text-base hover:bg-blue-500 hover:text-white md:p-1 rounded-md cursor-pointer"
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
              <Icon icon="clarity:share-line" className="text-3xl" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-center">
          <ImageSlider images={projectData.images} />
          <div className="flex md:hidden w-full">
            <button className="bg-blue-500 w-1/2 p-3 font-bold text-lg text-white cursor-pointer">
              {projectData.live_link != null && (
                <a href={projectData.live_link} target="_blank">
                  View Live
                </a>
              )}
            </button>
            <button className="bg-zinc-200 w-1/2 p-3 font-bold text-lg text-slate-500 cursor-pointer">
              {projectData.github_link != null && (
                <a href={projectData.github_link} target="_blank">
                  View Code
                </a>
              )}
            </button>
          </div>
          <div className="m-3 flex flex-col md:m-0 items-center">
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
              <h1 className="py-5 px-2 font-semibold text-2xl">
                Comments (69)
              </h1>
              <div className="flex items-center w-full">
                <CommentImage size="commentImage" image={profileData.image} />
                <div className="relative flex flex-col w-full ml-3">
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Add a comment.."
                      value={text}
                      onInput={(e) => setText(e.target.value)}
                      className="outline-none border-b-2 border-black/25 w-full p-2"
                    />
                    <Icon
                      icon="akar-icons:send"
                      className="text-2xl text-blue-500 cursor-pointer"
                    />
                  </div>
                  {isEmojiPicker && (
                    <div className="absolute top-24 left-6">
                      <Picker onSelect={onEmojiClick} set="apple" />
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-4">
                    <Icon
                      icon="fluent:emoji-add-24-regular"
                      className="hidden md:flex text-slate-400 text-3xl cursor-pointer"
                      onClick={() => setIsEmojiPicker(!isEmojiPicker)}
                    />
                    <div className="flex">
                      <button className="text-base font-medium text-slate-400 hover:bg-blue-500 hover:text-white rounded-md py-3 px-4 cursor-pointer">
                        CANCEL
                      </button>
                      <button className="text-base font-medium text-slate-400 hover:bg-blue-500 hover:text-white rounded-md py-3 px-4 cursor-pointer">
                        COMMENT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Project;
