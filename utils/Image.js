const cloudinary = require("cloudinary").v2;

const dev = process.env.NODE_ENV !== "production";

const server = dev
  ? "http://localhost:3000"
  : "https://devshowcase-22.vercel.app";

const getSignature = async () => {
  const response = await fetch(`${server}/api/signature`);
  const data = await response.json();
  return data;
};

const uploadImage = async (acceptedFiles) => {
  const { timestamp, signature } = await getSignature();

  const promises = acceptedFiles.map(async (file) => {
    const res = await cloudinary.uploader.upload(
      file,
      {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        signature: signature,
        timestamp: timestamp,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
      },
      (err, result) => result
    );
    return res;
  });

  const tempArray = await Promise.all(promises);
  const imgArray = tempArray.map((image) => image.public_id);

  return imgArray;
};

const deleteImage = async (deleteFiles) => {
  const { timestamp, signature } = await getSignature();

  const promises = deleteFiles.map(async (file) => {
    const res = await cloudinary.uploader.destroy(
      file,
      {
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        signature: signature,
        timestamp: timestamp,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
      },
      (err, result) => {
        if (err) return err;
        return result;
      }
    );
    return res;
  });

  const tempArray = await Promise.all(promises);
};

export { uploadImage, deleteImage };
