import Image from "next/image";

function CommentImage({ size, image }) {
  return (
    <div
      className={
        size == "headerImage"
          ? "w-[7.5rem] md:w-[5rem]"
          : "w-[5rem] md:w-[4rem]"
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
    </div>
  );
}

export default CommentImage;
