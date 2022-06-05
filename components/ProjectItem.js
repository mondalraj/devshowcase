import Link from "next/link";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";
const { motion } = require("framer-motion");

function ProjectItem({ project, listId, isLogin, profileId }) {
  const router = useRouter();

  var projectImage = project.images || [];

  const variants = {
    pageInitial: {
      translateY: 50,
      opacity: 0,
    },
    pageAnimate: {
      translateY: 0,
      opacity: 1,
      transition: {
        delay: `${listId}`,
        duration: 1,
      },
    },
    pageExit: {
      opacity: 0,
      translateY: 50,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <motion.div
      initial="pageInitial"
      animate="pageAnimate"
      exit="pageExit"
      whileHover={{ scale: 1.05, duration: 0.2 }}
      variants={variants}
      className="w-full sm:w-[22rem] my-2 h-72 bg-slate-200 cursor-pointer shadow-xl flex flex-col justify-between rounded-md"
    >
      <Link href={`/project/${project._id}`}>
        <img
          src={`https://res.cloudinary.com/devshowcase/image/upload/${projectImage[0]}`}
          className="w-full h-[85%]"
        />
      </Link>
      <div className="p-2 bg-zinc-900 text-white font-semibold bg-opacity-70 rounded-bl-md rounded-br-md flex justify-between items-center h-[15%]">
        <h1> {project.name}</h1>
        {isLogin && (
          <div
            className="bg-blue-500 p-1.5 rounded-full"
            onClick={() =>
              router.push(
                `/projectform?referer=${profileId}&edit=true&id=${project._id}`
              )
            }
          >
            <Icon icon="bxs:pencil" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default ProjectItem;
