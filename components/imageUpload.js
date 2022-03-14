import { Icon } from "@iconify/react";
import Image from "next/image";
import { useState } from "react";

export default function ImageUpload({ SetFiles }) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files) {
      const filesArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      if (selectedFiles.length + filesArray.length > 4) {
        alert("You are only allowed to upload a maximum of 4 files");
        return;
      }

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      SetFiles((prevPics) => prevPics.concat(...files));

      Array.from(files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const removePics = (index) => {
    setSelectedFiles(selectedFiles.filter((element, i) => i !== index));
  };

  const renderPhotos = (source) => {
    return source.map((photo, index) => {
      console.log(index);
      return (
        <div className="relative flex justify-center" key={index}>
          <img src={photo} alt="" className="w-44 h-36 md:w-56 md:h-44 p-2" />
          <Icon
            icon="entypo:cross"
            className="text-neutral-700 text-xl cursor-pointer absolute top-0 right-0"
            onClick={() => removePics(index)}
          />
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col mb-5 w-full">
      <h2 className="text-2xl font-medium px-3">Upload images here</h2>
      <div className="flex flex-col items-center">
        {Array.isArray(selectedFiles) && !selectedFiles.length ? (
          <span className="my-5">
            <Image
              src="/images/imagePlaceholder.png"
              height={200}
              width={300}
            />
          </span>
        ) : (
          <div className="my-5 max-h-fit min-h-full w-full flex flex-wrap justify-center items-center">
            {renderPhotos(selectedFiles)}
          </div>
        )}
        <label
          className="p-3 rounded-full border-0 font-semibold bg-blue-500 text-white
            hover:bg-blue-700 cursor-pointer"
        >
          <span className="text-base leading-normal">Choose images</span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            required
          />
        </label>
        <h3 className="mt-1 text-blue-700/75 text-sm">
          * (Max four photos of project are allowed upto 5MB)
        </h3>
      </div>
    </div>
  );
}
