import { Icon } from "@iconify/react";
import CommentImage from "../components/commentImage";
import { useState, useEffect } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import { useRef } from "react";

function CommentSection({ projectId, comments, setComments }) {
  const [isEmojiPicker, setIsEmojiPicker] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [text, setText] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const commentInput = useRef(null);

  const onEmojiClick = (emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const handleUserClick = (e) => {
    if (commentInput.current && !commentInput.current.contains(e.target)) {
      handleCancel();
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleUserClick);

    return () => {
      window.removeEventListener("click", handleUserClick);
    };
  });

  useEffect(() => {
    if (chosenEmoji !== null) {
      text += chosenEmoji.native;
      setText(text);
    }
  }, [chosenEmoji]);

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
      userData.user.profile_id._id &&
      userData.status == "success"
    ) {
      setProfileData(userData.user.profile_id);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleCancel = () => {
    setIsEmojiPicker(false);
    setShowButton(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text == "") return;
    const res = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        profile_id: profileData._id,
        project_id: projectId,
        content: text,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const data = await res.json();

    if (data.status == "success") {
      setComments([...comments, data.comment]);
      setText("");
      setIsEmojiPicker(false);
    }
  };

  return (
    <>
      <h1 className="py-5 px-2 font-semibold text-2xl">
        Comments ({comments.length})
      </h1>
      {isLoggedIn && (
        <div
          className="flex items-center w-full px-4 md:px-0"
          ref={commentInput}
        >
          <CommentImage size="commentImage" image={profileData.image} />
          <div className="relative flex flex-col w-full ml-3">
            <div className="flex items-center">
              <input
                onFocus={() => setShowButton(true)}
                type="text"
                placeholder="Add a comment.."
                value={text}
                onInput={(e) => setText(e.target.value)}
                className="outline-none border-b-2 border-black/25 w-full p-2"
                required
                onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
              />
            </div>

            {isEmojiPicker && (
              <div className="absolute -top-[26rem]">
                <Picker onSelect={onEmojiClick} set="apple" />
              </div>
            )}
            {showButton && (
              <div className="flex justify-between items-center mt-4">
                <Icon
                  icon="fluent:emoji-add-24-regular"
                  className="hidden md:flex text-slate-400 text-3xl cursor-pointer"
                  onClick={() => setIsEmojiPicker(!isEmojiPicker)}
                />
                <div className="flex">
                  <button
                    className="text-base font-medium text-slate-400 hover:bg-blue-500 hover:text-white rounded-md py-3 px-4 cursor-pointer"
                    onClick={handleCancel}
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
            )}
          </div>
        </div>
      )}
      <div className="my-6 px-4 md:px-0">
        {comments.length != undefined &&
          comments
            .slice(0)
            .reverse()
            .map((comment, index) => {
              return (
                <div className="flex  mb-2" key={index}>
                  <div className="flex flex-col">
                    <CommentImage
                      size="commentImage"
                      image={comment.profile_pic}
                    />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{comment.profile_name}</h3>
                    <p className="w-full">{comment.content}</p>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
}

export default CommentSection;
