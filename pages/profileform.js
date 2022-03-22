import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ProjectTagsInput from "../components/projectTagsInput";
import uploadImage from "../utils/Image";

function ProfileForm() {
  const [acceptedFile, setAcceptedFile] = useState([]);
  const [tags, setTags] = useState([]);
  const [data, setData] = useState({
    name: "",
    date: "",
    bio: "",
    location: "",
    company: "",
    work: "",
    school: "",
    course: "",
    skills: "",
  });

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  function submit(e) {
    e.preventDefault();
    console.log(acceptedFile);
    // const response = await uploadImage(e, acceptedFile);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        date: data.date,
        bio: data.bio,
        location: data.location,
        company: data.company,
        work: data.work,
        school: data.school,
        course: data.course,
        skills: data.skills,
        designation: data.designation,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  const handleImageChange = (e) => {
    const files = e.target.files;

    if (files) {
      setAcceptedFile([]);
      setAcceptedFile((prevPics) => prevPics.concat(...files));
    }
  };

  return (
    <div>
      <Head>
        <title>Profile Form</title>
      </Head>
      <div className="bg-gray-400 w-full h-full flex flex-col items-center justify-center">
        <div className="md:invisible p-3 md:p-16 flex flex-col justify-center items-center">
          <label htmlFor="file-input">
            <Image
              src={
                !acceptedFile.length
                  ? "/images/avatar.png"
                  : URL.createObjectURL(acceptedFile[0])
              }
              width={125}
              height={118}
              className="rounded-full drop-shadow-lg cursor-pointer"
            />
          </label>
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <input
            onChange={(e) => handle(e)}
            value={data.designation}
            className="bg-inherit appearance-none w-full placeholder:text-white text-center	py-2 text-black leading-tight focus:outline-none border-none font-semibold"
            id="date"
            type="text"
            placeholder="Add Designation"
            required
          />
        </div>
      </div>
      <div className="flex flex-row items-center justify-center md:-mt-24 md:mb-20 lg:w-10/12 mx-auto">
        <div className="flex flex-row shadow-2xl w-full md:w-11/12">
          <div className="hidden bg-white px-14 pt-28 pb-8 mb-4 md:block md:w-1/3 flex-col">
            <div className="flex justify-center">
              <label htmlFor="file-input">
                <Image
                  src={
                    !acceptedFile.length
                      ? "/images/avatar.png"
                      : URL.createObjectURL(acceptedFile[0])
                  }
                  width={125}
                  height={118}
                  className="rounded-full drop-shadow-lg cursor-pointer ml-2"
                />
              </label>
              <input
                id="file-input"
                type="file"
                className="hidden"
                accept="image/*"
              />
            </div>
            <input
              onChange={(e) => handle(e)}
              value={data.designation}
              className="appearance-none text-center w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none font-semibold"
              id="date"
              type="text"
              placeholder="Add Designation"
              required
            />
          </div>
          <div className="w-0.5 table-cell bg-gray-100"></div>
          <form className="bg-white px-8 w-screen" onSubmit={(e) => submit(e)}>
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
                  htmlFor="full-name"
                >
                  Name
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data.name}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="date">
                  Date Of Birth
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data.designation}
                  className="appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="date"
                  type="date"
                  placeholder="Your Birthday"
                  required
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="bio">
                  Bio
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data.bio}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="bio"
                  type="text"
                  placeholder="Tell us about yourself"
                  required
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="location">
                  Location
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data.location}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="location"
                  type="text"
                  placeholder="Your Location"
                  required
                />
              </div>
              <div className="mt-8 text-blue-500 text-lg lg:text-2xl font-semibold mb-5">
                Experience
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="company">
                  Company Name
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data.company}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="company"
                  type="text"
                  placeholder="Your Company"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold" htmlFor="work">
                  Work
                </label>
                <textarea
                  onChange={(e) => handle(e)}
                  value={data.work}
                  className="bg-gray-100 w-full p-2 resize-none focus:outline-none"
                  id="work"
                  placeholder="Describe your Work"
                ></textarea>
              </div>
              <div className="mt-8 text-blue-500 text-lg lg:text-2xl font-semibold mb-5">
                Education
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="school">
                  University/School
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data.school}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="school"
                  type="text"
                  placeholder="Your University/School"
                  required
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="course">
                  Course
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data.course}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="course"
                  type="text"
                  placeholder="Your Course"
                  required
                />
              </div>
              <div className="mt-8 text-blue-500 text-lg lg:text-2xl font-semibold mb-5">
                Skills
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2">
                <label className="block py-2 font-semibold " htmlFor="skills">
                  Technical Skills
                </label>
                <ProjectTagsInput
                  setTags={setTags}
                  profileFormTags={true}
                  tags={tags}
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
