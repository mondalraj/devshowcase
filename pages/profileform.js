import Head from "next/head";
import Image from "next/image";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useState } from "react";

function ProfileForm() {
  const [tags, setTags] = useState([]);
  return (
    <div>
      <Head>
        <title>Profile Form</title>
      </Head>
      <div className="bg-gray-400 w-full h-full flex flex-col items-center justify-center">
        <div className="md:invisible p-3 md:p-16 flex flex-col">
          <Image
            src="/images/avatar.png"
            width={125}
            height={118}
            className="rounded-full"
          />
          <button className="font-semibold hover:text-white">
            Add Designation
          </button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center md:-mt-24 md:mb-20 lg:w-10/12 mx-auto">
        <div className="flex flex-row shadow-2xl w-full md:w-11/12">
          <div className="hidden bg-white pl-10 pt-28 pb-8 mb-4 md:block flex-col">
            <Image
              src="/images/avatar.png"
              width={125}
              height={118}
              className="rounded-full drop-shadow-lg cursor-pointer"
            />
            <button className="font-semibold text-gray-400">
              Add Designation
            </button>
          </div>
          <div className="w-0.5 table-cell bg-gray-100"></div>
          <form className="bg-white px-8 w-screen">
            <div className="text-center text-blue-500 text-2xl font-semibold lg:text-4xl mb-7 md:mb-16 mt-6">
              Profile Form
            </div>
            <div>
              <div className="text-blue-500 text-lg lg:text-2xl font-semibold mb-5">
                Basic Info
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="inline-full-name"
                >
                  Name
                </label>
                <input
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="inline-full-name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="inline-date"
                >
                  Date Of Birth
                </label>
                <input
                  className="appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="inline-date"
                  type="date"
                  placeholder="Your Birthday"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="inline-bio"
                >
                  Bio
                </label>
                <input
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="inline-bio"
                  type="text"
                  placeholder="Tell us about yourself"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="inline-location"
                >
                  Location
                </label>
                <input
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="inline-location"
                  type="text"
                  placeholder="Your Location"
                />
              </div>
              <div className="mt-8 text-blue-500 text-lg lg:text-2xl font-semibold mb-5">
                Experience
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="inline-company"
                >
                  Company Name
                </label>
                <input
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="inline-company"
                  type="text"
                  placeholder="Your Company"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="inline-work"
                >
                  Work
                </label>
                <textarea
                  className="bg-gray-200 text-center w-full p-2"
                  id="work"
                  placeholder="Describe your Work"
                ></textarea>
              </div>
              <div className="mt-8 text-blue-500 text-lg lg:text-2xl font-semibold mb-5">
                Education
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="inline-school"
                >
                  University/School
                </label>
                <input
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="inline-school"
                  type="text"
                  placeholder="Your Uni/School"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="inline-course"
                >
                  Course
                </label>
                <input
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="inline-course"
                  type="text"
                  placeholder="Your Course"
                />
              </div>
              <div className="mt-8 text-blue-500 text-lg lg:text-2xl font-semibold mb-5">
                Skills
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="inline-skills"
                >
                  Technical Skills
                </label>
                <ReactTagInput
                  tags={tags}
                  placeholder="Your Skills"
                  maxTags={5}
                  editable={true}
                  readOnly={false}
                  removeOnBackspace={true}
                  onChange={(newTags) => setTags(newTags)}
                />
              </div>
            </div>
            <div className="flex md:justify-center justify-end items-center mb-5 md:mr-20">
              <input
                type="submit"
                value="SAVE"
                className=" bg-blue-500 shadow-lg md:w-3/12 shadow-blue-500/50 rounded-lg p-3 text-white font-bold mt-5 cursor-pointer hover:scale-110 transform duration-200"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
