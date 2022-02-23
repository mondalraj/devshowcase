import Head from "next/head";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import CommentImage from "../components/commentImage";
import ImageSlider from "../components/imageSlider";

function Project() {
  const [text, setText] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
    if (chosenEmoji !== null) {
      text += chosenEmoji.native;
      setText(text);
    }
  };

  return (
    <div className="relative">
      <Head>
        <title>Project</title>
      </Head>
      <div className="w-full bg-zinc-400/50 h-10 flex items-center justify-end">
        <Icon
          icon="entypo:cross"
          className="text-neutral-700 mr-3 text-2xl cursor-pointer"
        />
      </div>
      <div className="absolute top-1/3 -right-32 rotate-90 hidden md:block">
        <button className="bg-neutral-100/75 hover:bg-blue-500 py-2 px-10 font-bold text-base text-slate-500 hover:text-white cursor-pointer">
          View Live
        </button>
        <button className="bg-neutral-100/75 hover:bg-blue-500 py-2 px-10 font-bold text-base text-slate-500 hover:text-white cursor-pointer">
          View Code
        </button>
      </div>
      <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center m-auto">
        <h1 className="font-bold text-2xl md:hidden mt-4 flex justify-start w-full px-5">
          Project Name
        </h1>
        <div className="p-5 flex justify-between items-center w-full">
          <CommentImage />
          <div className="flex flex-col w-full px-3  md:px-10">
            <h1 className="font-bold text-lg hidden md:block">Project Name</h1>
            <div className="flex flex-col md:flex-row md:items-center">
              <h2 className="font-medium text-base">Owner Name</h2>
              <h2 className="text-xl px-1 hidden md:block">&bull;</h2>
              <h2 className="text-blue-500 text-base hover:bg-blue-500 hover:text-white md:p-1 rounded-md cursor-pointer">
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
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          <div>
            <Image
              src={
                "https://images.unsplash.com/photo-1644424235841-bbd3a2c823c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              }
              width={500}
              height={400}
            />
          </div>
          {/* <ImageSlider /> */}
          <div className="flex md:hidden">
            <button className="bg-blue-500 w-1/2 p-3 font-bold text-lg text-white cursor-pointer">
              View Live
            </button>
            <button className="bg-zinc-200 w-1/2 p-3 font-bold text-lg text-slate-500 cursor-pointer">
              View Code
            </button>
          </div>
          <div className="m-3 flex flex-col md:m-0">
            <div className="flex justify-start p-1 md:p-1.5 flex-wrap font-medium">
              <h2 className="text-blue-500 border-2 border-blue-500 px-3 py-1 ml-2 md:mx-2 my-1 text-base rounded-md">
                React Js
              </h2>
              <h2 className="text-blue-500 border-2 border-blue-500 px-3 py-1 ml-2 md:mx-2 my-1 text-base rounded-md">
                React Js
              </h2>
              <h2 className="text-blue-500 border-2 border-blue-500 px-3 py-1 ml-2 md:mx-2 my-1 text-base rounded-md">
                React Js
              </h2>
              <h2 className="text-blue-500 border-2 border-blue-500 px-3 py-1 ml-2 md:mx-2 my-1 text-base rounded-md">
                React Js
              </h2>
              <h2 className="text-blue-500 border-2 border-blue-500 px-3 py-1 ml-2 md:mx-2 my-1 text-base rounded-md">
                React Js
              </h2>
              <h2 className="text-blue-500 border-2 border-blue-500 px-3 py-1 ml-2 md:mx-2 my-1 text-base rounded-md">
                React Js
              </h2>
              <h2 className="text-blue-500 border-2 border-blue-500 px-3 py-1 ml-2 md:mx-2 my-1 text-base rounded-md">
                React Js
              </h2>
            </div>
            <p className="flex justify-start px-1.5 pb-10 text-lg md:text-base border-b-2 border-b-slate-300">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              recusandae deserunt, placeat ipsum assumenda nesciunt rerum cum
              nam impedit voluptates tenetur mollitia aspernatur eum esse soluta
              voluptatibus fugit ipsa delectus! Culpa, asperiores ipsa ex
              perspiciatis recusandae quisquam commodi itaque excepturi vero
              voluptatibus, omnis illum libero?
            </p>
            <div className="mb-20">
              <h1 className="py-5 px-2 font-semibold text-2xl">
                Comments (69)
              </h1>
              <div className="flex items-center w-full">
                <CommentImage />
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
                      className="text-slate-400 text-3xl cursor-pointer"
                      onClick={() => setIsEmojiPicker(!isEmojiPicker)}
                    />
                    <div className="flex">
                      <h2 className="text-base font-medium text-slate-400 hover:bg-blue-500 hover:text-white rounded-md px-2 cursor-pointer">
                        CANCEL
                      </h2>
                      <h2 className="text-base font-medium text-slate-400 hover:bg-blue-500 hover:text-white rounded-md px-2 cursor-pointer">
                        COMMENT
                      </h2>
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
