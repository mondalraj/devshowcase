const cloudinary = require("cloudinary").v2;

export default async function signGeneration(req, res) {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );

  res.status(200).json({ timestamp, signature });
}
