function ProjectItem() {
  return (
    <div
      className="w-full sm:w-80 my-2 h-72 bg-slate-200 rounded-md relative bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(https://thumbs.dreamstime.com/b/projects-concept-black-chalkboard-d-rendering-handwritten-top-view-office-desk-lot-business-office-supplies-79906734.jpg)`,
      }}
    >
      <div className="p-2 bg-zinc-900 absolute bottom-0 right-0 left-0 text-white font-semibold bg-opacity-70 rounded-md">
        Devshowcase web app
      </div>
    </div>
  );
}

export default ProjectItem;
