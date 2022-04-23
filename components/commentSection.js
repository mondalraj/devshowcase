import { Icon } from "@iconify/react";
import CommentImage from "../components/commentImage";
import { useState, useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function CommentSection({ image, projectId }) {
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [text, setText] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
    if (chosenEmoji !== null) {
      text += chosenEmoji.native;
      setText(text);
    }
  };

  useEffect(async () => {
    const userResponse = await fetch("/api/getUser", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const userData = await userResponse.json();
    if (
      userData.user != undefined &&
      userData.user.profile_id &&
      userData.status == "success"
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        project_id: projectId,
        content: text,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
    } else {
      setText("");
    }
  };

  return (
    <>
      <h1 className="py-5 px-2 font-semibold text-2xl">Comments (69)</h1>
      {isLoggedIn && (
        <div className="flex items-center w-full">
          <CommentImage size="commentImage" image={image} />
          <div className="relative flex flex-col w-full ml-3">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Add a comment.."
                value={text}
                onInput={(e) => setText(e.target.value)}
                className="outline-none border-b-2 border-black/25 w-full p-2"
                required
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
                <button
                  className="text-base font-medium text-slate-400 hover:bg-blue-500 hover:text-white rounded-md py-3 px-4 cursor-pointer"
                  onClick={() => setText("")}
                >
                  CANCEL
                </button>
                <button
                  className="text-base font-medium text-slate-400 hover:bg-blue-500 hover:text-white rounded-md py-3 px-4 cursor-pointer"
                  onClick={(e) => handleSubmit(e)}
                >
                  COMMENT
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="my-6">
        <div className="flex justify-center items-center mb-2">
          <div className="flex flex-col justify-center items-center w-1/4 mx-2">
            <CommentImage size="commentImage" image={image} />
            <h3 className="font-medium">Name</h3>
          </div>
          <p className="mx-5 w-3/4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudant
          </p>
        </div>
        <div className="flex justify-center items-center mb-2">
          <div className="flex flex-col justify-center items-center w-1/4 mx-2">
            <CommentImage size="commentImage" image={image} />
            <h3 className="font-medium">Name</h3>
          </div>
          <p className="mx-5 w-3/4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudant
            dolor sit amet consectetur adipisicing elit. Laudant dolor sit amet
            consectetur adipisicing elit. Laudant dolor sit amet consectetur
            adipisicing elit. Laudant dolor sit amet consectetur adipisicing
            elit. Laudant
          </p>
        </div>
        <div className="flex justify-center items-center mb-2">
          <div className="flex flex-col justify-center items-center w-1/4 mx-2">
            <CommentImage size="commentImage" image={image} />
            <h3 className="font-medium">Name</h3>
          </div>
          <p className="mx-5 w-3/4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudant
          </p>
        </div>
      </div>
    </>
  );
}

export default CommentSection;
