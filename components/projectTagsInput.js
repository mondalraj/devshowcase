import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProjectTagsInput({ tags, setTags, profileFormTags }) {
  const [tagInput, setTagInput] = useState("");

  const handleKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = tagInput.trim();

    if (
      key === "Enter" &&
      trimmedInput.length &&
      !tags.includes(trimmedInput)
    ) {
      setTagInput("");
      if (tags.length > 6 && profileFormTags == false) {
        toast.warning("Maximum tags limit reached");
        return;
      } else if (tags.length > 4 && profileFormTags == true) {
        toast.warning("Maximum tags limit reached");
        e.preventDefault();
        return;
      }
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
    }
  };

  const removeTags = (index) => {
    setTags(tags.filter((element, i) => i !== index));
  };

  return (
    <div className="mb-1 w-full">
      {!profileFormTags ? (
        <h2 className="text-2xl font-medium px-3 mb-5">
          Add tags related to project
        </h2>
      ) : null}
      <ToastContainer position="top-right" autoClose={2000} />
      {!profileFormTags ? (
        <div className="flex flex-col items-start md:items-center justify-center my-3 mx-5">
          <input
            type="text"
            className="px-5 py-3 mb-2 w-full md:w-4/5 rounded-md placeholder:italic placeholder:text-slate-400 block bg-gray-200/25 border border-slate-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm"
            placeholder="Add Tags..."
            value={tagInput}
            onKeyDown={handleKeyDown}
            onInput={(e) => setTagInput(e.target.value)}
          />

          <div>
            {tags.map((tag, index) => {
              return (
                <div
                  className="bg-blue-500 rounded-full py-2 px-3 m-2 font-medium text-white inline-flex justify-center items-center"
                  key={index}
                >
                  <span className="mr-2 text-base">{tag}</span>
                  <span
                    className="rounded-full text-white text-2xl inline-flex justify-center items-center cursor-pointer"
                    onClick={() => removeTags(index)}
                  >
                    &times;
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-start">
          <input
            type="text"
            className="px-5 py-3 mb-2 w-full rounded-md placeholder:text-slate-400 block bg-gray-200/25 border border-slate-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm"
            placeholder="Add Tags..."
            value={tagInput}
            onKeyDown={handleKeyDown}
            onInput={(e) => setTagInput(e.target.value)}
          />

          <div>
            {tags.map((tag, index) => {
              return (
                <div
                  className="bg-blue-500 rounded-full py-2 px-3 m-1 font-medium text-white inline-flex justify-center items-center"
                  key={index}
                >
                  <span className="mr-2 text-base">{tag}</span>
                  <span
                    className="rounded-full text-white text-2xl inline-flex justify-center items-center cursor-pointer"
                    onClick={() => removeTags(index)}
                  >
                    &times;
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectTagsInput;
