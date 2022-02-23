import Head from "next/head";
import Image from "next/image";
import { Icon } from "@iconify/react";
import ProjectItem from "../components/ProjectItem";

function profile() {
  return (
    <div className="profile">
      <Head>
        <title>Profile</title>
      </Head>
      <div className="profile_container">
        <div className="profile_navbar max-w-screen-xl mx-auto w-full h-16 flex justify-between items-center p-5">
          <img
            src="images/logo.png"
            alt=""
            className=" logo w-44 flex justify-between items-center mt-5"
          />
          <div className="flex gap-2 items-end">
            <h1 className="hidden sm:block text-lg">Logout</h1>
            <Icon icon="icons8:shutdown" className="text-2xl" />
          </div>
        </div>
        <div className="bg-gray-200 relative">
          <div className="profile_mainSection max-w-screen-xl mx-auto w-full  h-auto p-5 md:py-10 md:flex justify-evenly items-start gap-8">
            <div className="profile_details flex justify-evenly items-center md:flex-col gap-2">
              <img
                src="https://www.whatsappimages.in/wp-content/uploads/2021/04/Sad-Whatsapp-Dp-Profile-Photo-HD-Download.jpg"
                alt=""
                className="rounded-full w-28 md:w-48"
              />
              <div className="flex flex-col w-full">
                <div className="text-xl font-semibold md:hidden">
                  Rajib Mondal
                </div>
                <div className="tracking-wide md:font-semibold">
                  Co-Founder at devshowcase
                </div>
                <div className="hidden md:flex my-1 gap-1 items-center">
                  <Icon
                    icon="majesticons:map-marker-area-line"
                    className="text-xl"
                  />
                  New Delhi, India
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
            <div className="md:w-3/5">
              <div className="profile_description">
                <div className="hidden md:flex text-3xl tracking-wider mb-4 font-semibold">
                  Rajib Mondal
                </div>
                <div className="hidden md:flex justify-start items-center flex-wrap gap-1.5 mt-3 mb-5">
                  <div className="bg-blue-600 rounded-xl px-3 py-1 text-white tracking-wider">
                    Designer
                  </div>
                  <div className="bg-blue-600 rounded-xl px-3 py-1 text-white tracking-wider">
                    Web Developer
                  </div>
                  <div className="bg-blue-600 rounded-xl px-3 py-1 text-white tracking-wider">
                    React js
                  </div>
                  <div className="bg-blue-600 rounded-xl px-3 py-1 text-white tracking-wider">
                    REST API
                  </div>
                </div>
                <div className="flex justify-evenly items-center mt-2">
                  <div className="w-1/2 bg-white text-blue-700 font-semibold text-center p-1 rounded-md tracking-wider">
                    About
                  </div>
                  <div className="w-1/2 text-center p-1 rounded-md text-gray-600 tracking-wider">
                    Experience
                  </div>
                </div>
                <div className="my-3">
                  <div>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Aperiam libero architecto numquam quisquam reiciendis ipsam
                    ex odio, debitis id magni? Lorem ipsum dolor sit amet
                    consectetur adipisicing elit. Nesciunt, quae!
                  </div>
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
                    <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">
                      Designer
                    </div>
                    <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">
                      Web Developer
                    </div>
                    <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">
                      React js
                    </div>
                    <div className="bg-blue-600 rounded-xl px-3 py-0.5 text-white tracking-wider">
                      REST API
                    </div>
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
              </div>
            </div>
          </div>
          <div className="hidden absolute md:flex justify-evenly items-center -right-24 top-1/3 rotate-90 w-1/6">
            <div className="w-1/2 bg-blue-500 text-center p-2 rounded-md tracking-wider">
              About
            </div>
            <div className="w-1/2 bg-white text-center p-2 rounded-md text-gray-600 tracking-wider">
              Experience
            </div>
          </div>
        </div>
        <div className="profile_projectSection w-full max-w-screen-xl mx-auto flex flex-col sm:flex-row gap-3 mt-3 px-5 justify-center flex-wrap">
          <ProjectItem />
          <ProjectItem />
          <a
            href="/projectform"
            className="hidden hover:border-blue-500 hover:border-solid hover:bg-white hover:text-blue-500 group w-80 h-72 mt-2.5 md:flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-400 text-lg leading-6 text-slate-900 font-medium py-3"
          >
            <Icon
              icon="carbon:add"
              className="group-hover:text-blue-500 mb-1 text-slate-400 text-4xl"
            />
            New project
          </a>
        </div>
      </div>
    </div>
  );
}

export default profile;
