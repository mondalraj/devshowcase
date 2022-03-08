import Image from "next/image";
import { useState } from "react";

export default function ImageUpload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState([]);

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
      setAcceptedFiles((prevPics) => prevPics.concat(...files));

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

  const getSignature = async () => {
    const response = await fetch("/api/signature");
    const data = await response.json();
    const { timestamp, signature } = data;
    return { timestamp, signature };
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

    acceptedFiles.forEach(async (file) => {
      const { timestamp, signature } = await getSignature();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
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
        <h3 className="mt-1 text-blue-700/75 text-sm">
          * (Max four photos of project are allowed upto 5MB)
        </h3>
      </div>
    </div>
  );
}
