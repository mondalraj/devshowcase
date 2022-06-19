import Head from "next/head";
import { Icon } from "@iconify/react";
import ProjectItem from "../../components/ProjectItem";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import HireUsModal from "../../components/hireUsModal";
import Clipboard from "../../components/clipboard";
import Loader from "../../components/Loader";
import { removeCookies } from "cookies-next";
import deleteUser from "../../utils/deleteAccount";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "../../components/confirmModal";
const { motion } = require("framer-motion");

function profile({ data, profileData, id }) {
  const [isAbout, setIsAbout] = useState(true);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sameUser, setSameUser] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const router = useRouter();

  const removeBtn = useRef();
  const projectRef = useRef();

  const getHostname = (url) => {
    return new URL(url).hostname;
  };

  useEffect(() => {
    if (data.status == "fail") {
      setIsLoggedIn(false);
    } else if (id === data.user.profile_id._id) {
      setIsLoggedIn(true);
      setSameUser(true);
    } else {
      setIsLoggedIn(true);
    }

    if (profileData.status == "fail" || !profileData.user) {
      router.push("/404");
    } else {
      setUserData(profileData.user);
    }
    if (profileData.status != "fail" && profileData.user.image) {
      setImage(true);
    }
    setIsLoading(false);
  }, []);

  const handleUserClick = (e) => {
    if (
      projectRef.current &&
      removeBtn.current &&
      !projectRef.current.contains(e.target) &&
      !removeBtn.current.contains(e.target)
    ) {
      setIsDelete(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleUserClick);

    return () => {
      window.removeEventListener("click", handleUserClick);
    };
  });

  var skillArray = userData.skills;
  var projectsArray = userData.projects;
  var len = projectsArray?.length;
  len = (len * (len + 1)) / 2;

  const variants = {
    pageInitial: {
      translateY: 50,
      opacity: 0,
    },
    pageAnimate: {
      translateY: 0,
      opacity: 1,
      transition: {
        delay: `${len - 0.5}`,
        duration: 1,
      },
    },
  };

  const buttonVariants = {
    pageInitial: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
    pageAnimate: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    pageExit: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };

  function logout() {
    removeCookies("devshowcase_jwt");
    router.push("/");
  }

  const editProfilehandler = () => {
    router.push("/profileform?edit=true");
  };

  const handleDeleteClick = () => {
    deleteUser(userData._id);
    logout();
  };

  if (isLoading)
    return (
      <div className="w-full h-screen">
        <Loader></Loader>
      </div>
    );

  return (
    <div className="profile overflow-hidden relative">
      <Head>
        <title>{userData.name}</title>
      </Head>
      {isModal && (
        <HireUsModal
          setModal={setIsModal}
          toEmail={userData.user_id.email}
          toName={userData.name}
        />
      )}
      {isConfirm && (
        <ConfirmModal
          message={"Do you really want to deactivate your account ?"}
          setConfirm={setIsConfirm}
          cb={handleDeleteClick}
        />
      )}
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="profile_container min-h-screen font-dm">
        <nav className="profile_navbar max-w-screen-xl mx-auto w-full h-16 flex justify-between items-center p-5">
          <a href="/">
            <img
              src="../images/logo.png"
              alt=""
              className=" logo w-44 flex justify-between items-center mt-5 hover:scale-125 transition-scale duration-200"
            />
          </a>
          {isLoggedIn == true ? (
            <div className="flex justify-center items-center gap-5">
              <a
                href={
                  data.user.profile_id
                    ? `/profile/${data.user.profile_id._id}`
                    : "/profileform"
                }
              >
                <div className="flex gap-2 items-end">
                  <button className="hidden sm:block text-lg">
                    {data.user.username}
                  </button>
                  <Icon
                    icon="ic:baseline-account-circle"
                    className="text-3xl text-[#094FFF]"
                  />
                </div>
              </a>
              <div
                className="relative cursor-pointer text-black"
                onMouseEnter={() => setisOpen(true)}
                onMouseLeave={() => setisOpen(false)}
              >
                <Icon icon="ci:settings" className="text-2xl text-slate-600" />
                <ul
                  className={`w-[12rem] text-center font-medium absolute z-50 bg-slate-100 shadow-md p-5 top-8 right-2 ${
                    isOpen ? "h-fit opacity-100" : "h-0 opacity-0"
                  } transition-all duration-125 ease text-lg rounded-sm overflow-hidden`}
                >
                  {sameUser && (
                    <>
                      <li
                        className="hover:bg-red-600 hover:text-slate-50 p-1 rounded-lg"
                        onClick={() => setIsConfirm(true)}
                      >
                        Delete Account
                      </li>
                      {projectsArray?.length != 0 && (
                        <li
                          className="hover:bg-red-500 hover:text-slate-50 p-1 rounded-lg"
                          onClick={() => setIsDelete(true)}
                          ref={removeBtn}
                        >
                          Remove Project
                        </li>
                      )}
                    </>
                  )}
                  <li
                    className="hover:bg-blue-500 hover:text-slate-50 p-1 rounded-lg"
                    onClick={() => logout()}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : null}
        </nav>
        <div className="bg-gray-200 relative">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="profile_mainSection max-w-screen-xl mx-auto w-full  h-auto p-5 md:py-10 md:flex justify-evenly items-start gap-8"
          >
            <div className="profile_details flex justify-evenly items-center md:flex-col gap-2">
              <motion.img
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                src={
                  image
                    ? `https://res.cloudinary.com/devshowcase/image/upload/${userData.image}`
                    : "../images/avatar.png"
                }
                alt=""
                className="rounded-full w-[11rem] h-[7rem] md:w-[10rem] md:h-[10rem] object-cover shadow-xl"
              />
              <div className="flex flex-col w-full">
                <div className="text-xl font-semibold md:hidden">
                  {userData.name}
                </div>
                <div className="tracking-wide md:font-semibold md:text-center">
                  {userData.designation}
                </div>
                <div className="hidden md:flex my-1 gap-1 items-center justify-center">
                  <Icon
                    icon="majesticons:map-marker-area-line"
                    className="text-xl"
                  />
                  {userData.location}
                </div>
                <div className="flex gap-6 mt-2 md:hidden">
                  {userData?.linked_in ? (
                    <a
                      href={
                        "https://www.linkedin.com/in/" + userData?.linked_in
                      }
                    >
                      <Icon
                        icon="carbon:logo-linkedin"
                        className="text-3xl cursor-pointer text-blue-600"
                      />
                    </a>
                  ) : null}
                  {userData?.instagram ? (
                    <a
                      href={"https://www.instagram.com/" + userData?.instagram}
                    >
                      <Icon
                        icon="cib:instagram"
                        className="text-3xl cursor-pointer text-white rounded-lg"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
                        }}
                      />
                    </a>
                  ) : null}
                  {userData?.github ? (
                    <a href={"https://www.github.com/" + userData?.github}>
                      <Icon
                        icon="fe:github"
                        className="text-3xl cursor-pointer"
                      />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="md:w-3/5 mt-4">
              <div className="profile_description">
                <div className="hidden md:flex text-3xl tracking-wider mb-4 font-bold">
                  <h1 className="mr-8">{userData.name}</h1>
                  <Clipboard router={router} />
                </div>
                <div className="hidden md:flex justify-start items-center flex-wrap gap-1.5 my-3">
                  {skillArray?.map((skills, id) => (
                    <div
                      className="bg-blue-600 rounded-xl px-3 py-1 text-white tracking-wider shadow-lg hover:shadow-blue-500 cursor-default"
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
                    <motion.div
                      animate={isAbout ? "pageAnimate" : "pageInitial"}
                      exit="pageExit"
                      variants={buttonVariants}
                    >
                      <p className="text-lg my-2 md:my-0">{userData.bio}</p>
                    </motion.div>
                  ) : (
                    <motion.div
                      animate={isAbout ? "pageInitial" : "pageAnimate"}
                      exit="pageExit"
                      variants={buttonVariants}
                    >
                      <h1 className="hidden md:block font-medium text-xl">
                        Past Experience
                      </h1>
                      <div>
                        <h2 className="text-lg text-neutral-600 underline underline-offset-2 font-bold">
                          {userData.company_name}
                        </h2>
                        <p className="md:my-1 my-5">
                          {userData.work_description
                            ? userData.work_description
                            : "No work experience (Fresher)"}
                        </p>
                      </div>
                    </motion.div>
                  )}
                  <div className="flex justify-between items-center">
                    {userData?.website ? (
                      <div className="flex gap-2 cursor-pointer mb-2 md:mb-0">
                        <a
                          href={userData?.website}
                          target="no_blank"
                          className="flex gap-2 cursor-pointer"
                        >
                          <Icon icon="mdi:web" className="text-2xl" />
                          <h1 className="tracking-wider text-blue-600 font-semibold hover:text-blue-800 hover:underline">
                            {getHostname(userData?.website)}
                          </h1>
                        </a>
                      </div>
                    ) : null}
                    <div className="hidden gap-4 mt-2 md:flex">
                      {userData?.linked_in ? (
                        <a
                          href={
                            "https://www.linkedin.com/in/" + userData?.linked_in
                          }
                          target="no_blank"
                        >
                          <Icon
                            icon="carbon:logo-linkedin"
                            className="text-3xl cursor-pointer hover:text-blue-600 hover:scale-110"
                          />
                        </a>
                      ) : null}
                      {userData?.instagram ? (
                        <a
                          href={
                            "https://www.instagram.com/" + userData?.instagram
                          }
                          target="no_blank"
                        >
                          <Icon
                            icon="ci:instagram"
                            className="text-3xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-md hover:text-white"
                          />
                        </a>
                      ) : null}
                      {userData?.github ? (
                        <a
                          href={"https://www.github.com/" + userData?.github}
                          target="no_blank"
                        >
                          <Icon
                            icon="fe:github"
                            className="text-3xl cursor-pointer hover:text-gray-700 hover:scale-110"
                          />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex md:hidden justify-start items-center flex-wrap gap-1">
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
                {sameUser == false && (
                  <button
                    className={`w-full md:w-52 rounded-md bg-white p-2 flex items-center justify-center gap-1 hover:scale-105 hover:shadow-lg`}
                    onClick={() => setIsModal(true)}
                  >
                    <Icon
                      icon="entypo:mail"
                      className="text-2xl text-blue-500"
                    />
                    Send Message
                  </button>
                )}
                {sameUser == true && (
                  <button
                    className={`w-1/2 md:w-52 rounded-md bg-white p-2 flex items-center justify-center gap-1 hover:scale-105 hover:shadow-lg`}
                    onClick={() => editProfilehandler()}
                  >
                    <Icon
                      icon="entypo:pencil"
                      className="text-2xl text-blue-500"
                    />
                    Edit Profile
                  </button>
                )}

                {sameUser ? (
                  <a
                    href={`/projectform?referer=${userData._id}`}
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
          </motion.div>

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
        {projectsArray?.length != 0 ? (
          <div
            className="profile_projectSection w-full max-w-screen-xl mx-auto flex flex-col sm:flex-row gap-5 my-3 px-5 justify-center flex-wrap"
            ref={projectRef}
          >
            {projectsArray?.map((projects, index) => {
              return (
                <ProjectItem
                  project={projects}
                  key={index}
                  listId={index}
                  isDelete={isDelete}
                />
              );
            })}
            {sameUser ? (
              <motion.a
                initial="pageInitial"
                animate="pageAnimate"
                variants={variants}
                href={`/projectform?referer=${userData._id}`}
                className="hidden hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-80 h-72 mt-2.5 md:flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-400 text-lg leading-6 text-slate-900 font-medium py-3"
              >
                <Icon
                  icon="carbon:add"
                  className="group-hover:text-blue-500 mb-1 text-slate-400 text-4xl"
                />
                New project
              </motion.a>
            ) : null}
          </div>
        ) : (
          <div className="profile_projectSection w-full h-fit max-w-screen-xl mx-auto flex flex-col sm:flex-row gap-5 my-3 px-5 justify-center flex-wrap">
            {sameUser ? (
              <>
                <a
                  href={`/projectform?referer=${userData._id}`}
                  className="hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-full h-72 mt-2.5 md:flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-400 text-lg leading-6 text-slate-900 font-medium py-3 hidden"
                >
                  <Icon
                    icon="carbon:add"
                    className="group-hover:text-blue-500 mb-1 text-slate-400 text-4xl"
                  />
                  New project
                </a>
                <div className="w-full flex flex-col justify-center items-center md:hidden">
                  <img
                    src="../images/no_project.svg"
                    className="mt-5 md:w-1/2"
                  />
                  <h2 className="text-slate-500 text-xl md:text-3xl mb-4">
                    No Projects Found 😢
                  </h2>
                </div>
              </>
            ) : (
              <div className="w-full flex flex-col justify-center items-center">
                <img src="../images/no_project.svg" className="mt-5 md:w-1/2" />
                <h2 className="text-slate-500 text-xl md:text-3xl mb-4">
                  No Projects Found 😢
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const dev = process.env.NODE_ENV !== "production";

const server = dev
  ? "http://localhost:3000"
  : "https://devshowcase-22.vercel.app";

export async function getServerSideProps({ params, req }) {
  const userRes = await fetch(`${server}/api/getUser`, {
    method: "GET",
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Cookie: req.headers.cookie,
    },
  });

  const data = await userRes.json();

  const id = params.id;

  const profileRes = await fetch(`${server}/api/profile`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      profile_id: id,
    },
  });

  const profileData = await profileRes.json();

  return {
    props: {
      data,
      profileData,
      id,
    },
  };
}

export default profile;
