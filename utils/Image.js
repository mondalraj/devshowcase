const getSignature = async () => {
  const response = await fetch("/api/signature");
  const data = await response.json();
  return data;
};

const uploadImage = async (e, acceptedFiles) => {
  e.preventDefault();
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  const imgArray = [];
  const { timestamp, signature } = await getSignature();
  acceptedFiles.forEach(async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      imgArray.push(data.public_id);
    } catch (err) {
      console.error(err);
    }
  });

  return imgArray;
};

export default uploadImage;
