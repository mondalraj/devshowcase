import { Icon } from "@iconify/react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageUpload({ SetFiles, filesArray, DeleteFiles }) {
  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files) {
      if (files.length + filesArray.length > 4) {
        toast.warning("Only four photos are allowed as a maximum.");
        return;
      }

      SetFiles((prevPics) => prevPics.concat(...files));
    }
  };

  const removePics = (index) => {
    if (typeof filesArray[index] == "string") {
      DeleteFiles((prevPics) => prevPics.concat(filesArray[index]));
    }
    SetFiles(filesArray.filter((element, i) => i !== index));
  };

  const renderPhotos = (source) => {
    return source.map((photo, index) => {
      return (
        <div className="relative flex justify-center" key={index}>
          <img
            src={
              typeof photo == "object"
                ? URL.createObjectURL(photo)
                : `https://res.cloudinary.com/devshowcase/image/upload/${photo}`
            }
            alt={`projectImage-${index}`}
            className="w-44 h-36 md:w-56 md:h-44 p-2"
          />
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
        {Array.isArray(filesArray) && !filesArray.length ? (
          <span className="my-5">
            <Image
              src="/images/imagePlaceholder.png"
              height={200}
              width={300}
            />
          </span>
        ) : (
          <div className="my-5 max-h-fit min-h-full w-full flex flex-wrap justify-center items-center">
            {renderPhotos(filesArray)}
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
          />
        </label>
        <h3 className="mt-1 text-blue-700/75 text-sm">
          * (Max four photos of project are allowed upto 5MB)
        </h3>
      </div>
    </div>
  );
}
