import Link from "next/link";
const { motion } = require("framer-motion");

function ProjectItem({ project, listId }) {
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
    <Link href={`/project/${project._id}`}>
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        whileHover={{ scale: 1.05, duration: 0.2 }}
        variants={variants}
        // transition={{ duration: 1 }}
        className="w-full sm:w-[22rem] my-2 h-72 bg-slate-200 rounded-md relative bg-cover bg-no-repeat cursor-pointer shadow-xl overflow-hidden"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/devshowcase/image/upload/${projectImage[0]})`,
        }}
      >
        <div className="p-2 bg-zinc-900 absolute bottom-0 right-0 left-0 text-white font-semibold bg-opacity-70 rounded-md">
          {project.name}
        </div>
      </motion.div>
    </Link>
  );
}

export default ProjectItem;
