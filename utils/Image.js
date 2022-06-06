const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

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
    if (file.length != 0 && file.length < 30) return file;
    const res = await cloudinary.uploader.upload(
      file,
      {
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_KEY,
        signature: signature,
        timestamp: timestamp,
      },
      (err, result) => result
    );
    return res;
  });

  const tempArray = await Promise.all(promises);
  const imgArray = tempArray.map((image) => {
    if (typeof image == "object") return image.public_id;
    return image;
  });

  return imgArray;
};

const deleteImage = async (deleteFiles) => {
  const { timestamp, signature } = await getSignature();
  const promises = deleteFiles.map(async (file) => {
    const res = await cloudinary.uploader.destroy(
      file,
      signature,
      (err, result) => {
        if (err) return err;
        return result;
      }
    );
    return res;
  });

  const temp = await Promise.all(promises);
  return temp;
};

export { uploadImage, deleteImage };
