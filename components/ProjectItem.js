import Link from "next/link";

function ProjectItem({ project }) {
  // const [projectData, setProjectData] = useState({});
  // useEffect(async () => {
  //   const res = await fetch("/api/projects", {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //       project_id: id,
  //     },
  //   });
  //   const data = await res.json();

  //   if (data) {
  //     setProjectData(data.project);
  //   }
  // }, []);
  var projectImage = project.images || [];

  return (
    <Link href={`/project/${project._id}`}>
      <div
        className="w-full sm:w-[22rem] my-2 h-72 bg-slate-200 rounded-md relative bg-cover bg-no-repeat cursor-pointer"
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
