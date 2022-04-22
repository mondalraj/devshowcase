import Head from "next/head";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ProjectItem from "../../components/ProjectItem";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function profile() {
  const [isAbout, setIsAbout] = useState(true);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;
    fetch("/api/getUser", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "fail") {
          setIsLoggedIn(false);
        } else if (id === data.user.profile_id) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  }, [router.isReady]);

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      const { id } = router.query;

      const res = await fetch("/api/profile", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          profile_id: id,
        },
      });
      const data = await res.json();
      if (data.status == "fail") {
        router.push("/404");
      } else {
        setUserData(data.user);
      }
      if (data.status != "fail" && data.user.image) {
        setImage(true);
      }
    })();
  }, [router.isReady]);

  var skillArray = userData.skills;
  var projectsArray = userData.projects;

  function logout() {
    fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(data.message);
          router.push("/login");
        }
      });
  }

  return (
    <div className="profile">
      <Head>
        <title>Profile</title>
      </Head>
      <div className="profile_container">
        <div className="profile_navbar max-w-screen-xl mx-auto w-full h-16 flex justify-between items-center p-5">
          <a href="/">
            <img
              src="../images/logo.png"
              alt=""
              className=" logo w-44 flex justify-between items-center mt-5"
            />
          </a>
          {isLoggedIn == true ? (
            <div className="flex gap-2 items-end">
              <button
                className="hidden sm:block text-lg"
                onClick={() => logout()}
              >
                Logout
              </button>
              <Icon icon="icons8:shutdown" className="text-2xl" />
            </div>
          ) : null}
        </div>
        <div className="bg-gray-200 relative">
          <div className="profile_mainSection max-w-screen-xl mx-auto w-full  h-auto p-5 md:py-10 md:flex justify-evenly items-start gap-8">
            <div className="profile_details flex justify-evenly items-center md:flex-col gap-2">
              <img
                src={
                  image
                    ? `https://res.cloudinary.com/devshowcase/image/upload/${userData.image}`
                    : "../images/avatar.png"
                }
                alt=""
                className="rounded-full w-28 md:w-48"
              />
              <div className="flex flex-col w-full">
                <div className="text-xl font-semibold md:hidden">
                  {userData.name}
                </div>
                <div className="tracking-wide md:font-semibold">
                  {userData.designation}
                </div>
                <div className="hidden md:flex my-1 gap-1 items-center">
                  <Icon
                    icon="majesticons:map-marker-area-line"
                    className="text-xl"
                  />
                  {userData.location}
                </div>
                <div className="flex gap-6 mt-2 md:hidden">
                  <Icon
                    icon="carbon:logo-linkedin"
                    className="text-3xl cursor-pointer"
                  />
                  <Icon
                    icon="entypo-social:instagram-with-circle"
                    className="text-3xl cursor-pointer"
                  />
                  <Icon icon="fe:github" className="text-3xl cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="md:w-3/5 mt-4">
              <div className="profile_description">
                <div className="hidden md:flex text-3xl tracking-wider mb-4 font-bold">
                  {userData.name}
                </div>
                <div className="hidden md:flex justify-start items-center flex-wrap gap-1.5 my-3">
                  {skillArray?.map((skills, id) => (
                    <div
                      className="bg-blue-600 rounded-xl px-3 py-1 text-white tracking-wider"
                      key={id}
                    >
                      {skills}
                    </div>
                  ))}
                </div>
                <div className="md:hidden flex justify-evenly items-center mt-2">
                  <div
                    className={
                      (isAbout ? "bg-white text-blue-700" : "text-gray-600") +
                      " w-1/2 font-semibold text-center p-1 rounded-md tracking-wider"
                    }
                    onClick={() => setIsAbout(true)}
                  >
                    About
                  </div>
                  <div
                    className={
                      (isAbout ? "text-gray-600" : "bg-white text-blue-700") +
                      " w-1/2 font-semibold text-center p-1 rounded-md tracking-wider"
                    }
                    onClick={() => setIsAbout(false)}
                  >
                    Experience
                  </div>
                </div>

                <div className="mt-1 mb-3">
                  {isAbout ? (
                    <div>
                      <p>{userData.bio}</p>
                    </div>
                  ) : (
                    <div>
                      <h1 className="hidden md:block font-medium text-xl">
                        Past Experience
                      </h1>
                      <div className="md:ml-5">
                        <h2 className="text-lg text-neutral-600 underline underline-offset-2">
                          {userData.company_name}
                        </h2>
                        <p>{userData.work_description}</p>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2 cursor-pointer">
                      <Icon icon="mdi:web" className="text-2xl" />
                      <h1 className="tracking-wider text-blue-700 font-semibold">
                        www.abckuchbhi.com
                      </h1>
                    </div>
                    <div className="hidden gap-4 mt-2 md:flex">
                      <Icon
                        icon="carbon:logo-linkedin"
                        className="text-3xl cursor-pointer"
                      />
                      <Icon
                        icon="entypo-social:instagram-with-circle"
                        className="text-3xl cursor-pointer"
                      />
                      <Icon
                        icon="fe:github"
                        className="text-3xl cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex md:hidden justify-start items-center flex-wrap gap-1 mt-4">
                    {skillArray?.map((skills, id) => (
                      <div
                        className="bg-blue-600 rounded-xl px-3 py-1 text-white tracking-wider"
                        key={id}
                      >
                        {skills}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="profile_buttons flex justify-between items-center text-center gap-2 font-semibold ">
                <a
                  href=""
                  className="w-1/2 md:w-52 rounded-md bg-white p-2 flex items-center justify-center gap-1"
                >
                  <Icon icon="entypo:mail" className="text-2xl text-blue-500" />
                  Send Message
                </a>
                {isLoggedIn ? (
                  <a
                    href=""
                    className="md:hidden w-1/2 rounded-md bg-white p-2 flex items-center justify-center gap-1"
                  >
                    <Icon
                      icon="carbon:add-filled"
                      className="text-2xl text-blue-500"
                    />
                    Add Project
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          <div className="hidden absolute md:flex justify-evenly items-center -right-20 top-1/3 rotate-90 w-52 cursor-pointer">
            <div
              className={
                (isAbout
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600") +
                " w-1/2 text-center p-2 rounded-md tracking-wider font-medium"
              }
              onClick={() => setIsAbout(true)}
            >
              About
            </div>
            <div
              className={
                (isAbout
                  ? "bg-white text-gray-600"
                  : "bg-blue-500 text-white") +
                " w-1/2 text-center p-2 rounded-md tracking-wider font-medium"
              }
              onClick={() => setIsAbout(false)}
            >
              Experience
            </div>
          </div>
        </div>
        {projectsArray != 0 ? (
          <div className="profile_projectSection w-full max-w-screen-xl mx-auto flex flex-col sm:flex-row gap-5 mt-3 px-5 justify-center flex-wrap">
            {projectsArray?.map((project_id, index) => {
              return <ProjectItem id={project_id} key={index} />;
            })}
            {isLoggedIn ? (
              <a
                href={`/projectform?referer=${userData._id}`}
                className="hidden hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-80 h-72 mt-2.5 md:flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-400 text-lg leading-6 text-slate-900 font-medium py-3"
              >
                <Icon
                  icon="carbon:add"
                  className="group-hover:text-blue-500 mb-1 text-slate-400 text-4xl"
                />
                New project
              </a>
            ) : null}
          </div>
        ) : (
          <div className="profile_projectSection w-full max-w-screen-xl mx-auto flex flex-col sm:flex-row gap-5 mt-3 px-5 justify-center flex-wrap">
            {isLoggedIn ? (
              <a
                href={`/projectform?referer=${userData._id}`}
                className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full h-72 mt-2.5 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-400 text-lg leading-6 text-slate-900 font-medium py-3"
              >
                <Icon
                  icon="carbon:add"
                  className="group-hover:text-blue-500 mb-1 text-slate-400 text-4xl"
                />
                New project
              </a>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default profile;
