import Image from "next/image";
import { useState } from "react";

export default function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (selectedFiles.length > 4) {
      alert("You are only allowed to upload a maximum of 4 files");
      return;
    }
    if (files) {
      const filesArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );

      setSelectedFiles((prevImages) => prevImages.concat(filesArray));
      Array.from(files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return (
        <img
          src={photo}
          alt=""
          className="w-48 h-32 md:w-60 md:h-40 object-contain p-1"
          key={photo}
        />
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
          />
        </label>
      </div>
    </div>
  );
}
