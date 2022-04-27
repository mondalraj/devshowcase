import Link from "next/link";

function ProjectItem({ project }) {
  var projectImage = project.images || [];

  return (
    <Link href={`/project/${project._id}`}>
      <div
        className="w-full sm:w-[22rem] my-2 h-72 bg-slate-200 rounded-md relative bg-cover bg-no-repeat cursor-pointer shadow-xl  hover:scale-105 transition-scale duration-300 overflow-hidden"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/devshowcase/image/upload/${projectImage[0]})`,
        }}
      >
        <div className="p-2 bg-zinc-900 absolute bottom-0 right-0 left-0 text-white font-semibold bg-opacity-70 rounded-md">
          {project.name}
        </div>
      </div>
    </Link>
  );
}

export default ProjectItem;
