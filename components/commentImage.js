import Image from "next/image";
const { motion } = require("framer-motion");

function CommentImage({ size, image }) {
  return (
    <motion.div
      animate={{ scale: [0, 1.4, 1] }}
      transition={{ type: "spring", delay: 1 }}
      className={
        size == "headerImage"
          ? "w-[7.5rem] md:w-[5rem]  "
          : "w-[3.5rem] md:w-[4rem]  "
      }
    >
      <Image
        src={
          image
            ? `https://res.cloudinary.com/devshowcase/image/upload/${image}`
            : "/images/avatar.png"
        }
        width={"100%"}
        height={100}
        className="rounded-full object-cover object-top"
      />
    </motion.div>
  );
}

export default CommentImage;
