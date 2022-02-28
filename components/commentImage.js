import Image from "next/image";

function CommentImage({ size }) {
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
          "https://images.unsplash.com/photo-1644424235841-bbd3a2c823c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        }
        width={"100%"}
        height={100}
        className="rounded-full object-cover object-top"
      />
    </div>
  );
}

export default CommentImage;
