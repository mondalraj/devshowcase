import Link from "next/link";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
const { motion } = require("framer-motion");

function ProjectItem({ project, listId, isDelete }) {
  var projectImage = project.images || [];

  const router = useRouter();

  const handleClick = async () => {
    const ans = window.confirm("Do you really want to delete ?");

    if (!ans) return;

    const response = await fetch(`/api/projects`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        project_id: project._id,
      },
    });

    const data = await response.json();

    if (data.status == "fail") toast.error(data.message);
    else router.reload();
  };

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
      className="relative w-full sm:w-[22rem] my-2 h-72 bg-slate-200 cursor-pointer shadow-xl flex flex-col justify-between rounded-md"
    >
      {isDelete && (
        <Icon
          icon="gridicons:cross-circle"
          className="text-red-700 absolute z-50 -right-2 -top-3 text-2xl"
          onClick={handleClick}
        />
      )}
      <Link href={`/project/${project._id}`}>
        <img
          src={`https://res.cloudinary.com/devshowcase/image/upload/${projectImage[0]}`}
          className="w-full h-[85%]"
        />
      </Link>
      <div className="p-2 bg-zinc-900 text-white font-semibold bg-opacity-70 rounded-bl-md rounded-br-md flex justify-between items-center h-[15%]">
        <h1> {project.name}</h1>
      </div>
    </motion.div>
  );
}

export default ProjectItem;
