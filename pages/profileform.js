import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import ParticleBackground from "../components/particleBackground";
import ProjectTagsInput from "../components/projectTagsInput";
import Avatar from "../public/images/avatar.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const dev = process.env.NODE_ENV !== "production";
const server = dev
  ? "http://localhost:3000"
  : "https://devshowcase-22.vercel.app";

export async function getServerSideProps({ query, req }) {
  const userRes = await fetch(`${server}/api/getUser`, {
    method: "GET",
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Cookie: req.headers.cookie,
    },
  });

  const userData = await userRes.json();

  if (!query.edit) {
    return {
      props: {
        userData,
      },
    };
  }

  const profileRes = await fetch(`${server}/api/profile`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      profile_id: userData.user.profile_id._id,
    },
  });
  const profileData = await profileRes.json();

  return {
    props: {
      userData,
      profileData,
    },
  };
}

function ProfileForm(props) {
  const [acceptedFile, setAcceptedFile] = useState([]);
  const [pic, setPic] = useState("");
  const [profileID, setProfileID] = useState("");
  const [tags, setTags] = useState([]);
  const [userId, setUserId] = useState("");
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
    website: "",
    linked_in: "",
    instagram: "",
    github: "",
  });

  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const getBase64 = async () => {
    const promises = acceptedFile.map((file) => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          resolve(reader.result);
        };
      });
    });
    const images = await Promise.all(promises);
    return images;
  };

  const edit = router.query.edit ? true : false;

  useEffect(() => {
    if (props.userData.status == "fail") {
      router.push("/login");
    } else if (props.userData.user.profile_id && !edit) {
      router.push(`/profile/${props.userData.user.profile_id._id}`); //will change this after adding edit profile form route
    } else {
      setUserId(props.userData.user._id);
    }

    if (!edit) return;

    setData({
      name: props.profileData.user.name,
      date: props.profileData.user.date_of_birth,
      bio: props.profileData.user.bio,
      location: props.profileData.user.location,
      company: props.profileData.user.company_name,
      work: props.profileData.user.work_description,
      school: props.profileData.user.university_name,
      course: props.profileData.user.course_name,
      skills: props.profileData.user.skills,
      website: props.profileData.user.website,
      linked_in: props.profileData.user.linked_in,
      instagram: props.profileData.user.instagram,
      github: props.profileData.user.github,
      designation: props.profileData.user.designation,
    });

    setProfileID(props.profileData.user._id);
    setTags(props.profileData.user.skills);
    if (props.profileData.user.image) setPic(props.profileData.user.image);
  }, []);

  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }

  const handleDelete = () => {
    setPic("");
    setAcceptedFile([]);
  };

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    const imagesArray = await getBase64(acceptedFile);

    const res = await fetch("/api/profile", {
      method: edit ? "PATCH" : "POST",
      body: JSON.stringify({
        name: data.name,
        date: data.date,
        bio: data.bio,
        location: data.location,
        company: data.company,
        work: data.work,
        school: data.school,
        course: data.course,
        tags: tags,
        designation: data.designation,
        images: imagesArray,
        user_id: userId,
        website: data.website,
        linked_in: data.linked_in,
        instagram: data.instagram,
        github: data.github,
        pic: pic,
        id: profileID,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const Data = await res.json();
    if (Data.error) {
      toast.error(Data.error);
    } else {
      router.push(`/profile/${profileID || Data.userProfile._id}`);
      setLoading(false);
    }
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
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="bg-gray-300 w-full h-full flex flex-col items-center justify-center">
        <div className="md:h-24 h-10 w-full">
          <ParticleBackground />
        </div>
        <div className="md:invisible p-3 md:p-16 flex flex-col justify-center items-center">
          <label htmlFor="file-input">
            <div className="relative">
              <Image
                src={
                  !acceptedFile.length
                    ? pic != ""
                      ? `https://res.cloudinary.com/devshowcase/image/upload/${pic}`
                      : Avatar
                    : URL.createObjectURL(acceptedFile[0])
                }
                width={125}
                height={118}
                priority
                className={`rounded-full drop-shadow-lg cursor-pointer object-cover ${
                  acceptedFile.length == 0 && pic == "" && "blur-[1.5px]"
                }`}
              />
              {(pic != "" || acceptedFile.length != 0) && (
                <Icon
                  icon="fluent:delete-28-regular"
                  className="absolute text-3xl top-0 -right-7 cursor-pointer hover:text-red-500 hover:scale-125 z-50"
                  onClick={handleDelete}
                />
              )}
              {acceptedFile.length == 0 && pic == "" && (
                <Icon
                  icon="ant-design:camera-twotone"
                  className="absolute text-4xl top-[35%] left-[35%] text-blue-500 cursor-pointer"
                />
              )}
            </div>
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
            value={data?.designation}
            className="bg-inherit appearance-none w-full placeholder:text-white text-center	py-2 text-black leading-tight focus:outline-none border-none font-semibold"
            id="designation"
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
                <div className="relative">
                  <Image
                    src={
                      !acceptedFile.length
                        ? pic != ""
                          ? `https://res.cloudinary.com/devshowcase/image/upload/${pic}`
                          : Avatar
                        : URL.createObjectURL(acceptedFile[0])
                    }
                    width={125}
                    height={118}
                    priority
                    className={`rounded-full drop-shadow-lg cursor-pointer object-cover ${
                      !acceptedFile.length && pic == "" && "blur-[1.5px]"
                    }`}
                  />
                  {(pic != "" || acceptedFile.length != 0) && (
                    <Icon
                      icon="fluent:delete-28-regular"
                      className="absolute text-2xl top-0 -right-5 cursor-pointer hover:text-red-500 hover:scale-125 z-50"
                      onClick={handleDelete}
                    />
                  )}
                  {!acceptedFile.length && pic == "" && (
                    <Icon
                      icon="ant-design:camera-twotone"
                      className="absolute text-4xl top-[35%] left-[35%] text-blue-500 cursor-pointer z-10"
                    />
                  )}
                </div>
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
              value={data?.designation}
              className="appearance-none text-center w-full py-2  text-gray-700 leading-tight focus:outline-none font-semibold"
              id="designation"
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
                  value={data?.name}
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
                  value={data?.date}
                  className="appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="date"
                  type="date"
                  placeholder="Your Birthday"
                  required
                  min="1945-01-01"
                  max="2010-12-31"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="bio">
                  Bio
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data?.bio}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="bio"
                  type="text"
                  placeholder="Tell us about yourself"
                  required
                  maxLength={250}
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="location">
                  Location
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data?.location}
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
                  value={data?.company}
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
                  value={data?.work}
                  className="bg-gray-100 w-full p-2 resize-none focus:outline-none"
                  id="work"
                  placeholder="Describe your Work"
                  maxLength={500}
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
                  value={data?.school}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="school"
                  type="text"
                  placeholder="Your University/School"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="course">
                  Course
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data?.course}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="course"
                  type="text"
                  placeholder="Your Course"
                />
              </div>
              <div className="mt-8 text-blue-500 text-lg lg:text-2xl font-semibold mb-5">
                Social Links
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="website">
                  Website Link
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data?.website}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="website"
                  type="text"
                  placeholder="Your Website Link"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="linked_in"
                >
                  LinkedIn Username
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data?.linked_in}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="linked_in"
                  type="text"
                  placeholder="Your LinkedIn Username"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label
                  className="block py-2 font-semibold "
                  htmlFor="instagram"
                >
                  Instagram Username
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data?.instagram}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="instagram"
                  type="text"
                  placeholder="Your Instagram Username"
                />
              </div>
              <div className="md:grid md:grid-cols-2  md:space-y-0 space-y-1 p-2 border-b">
                <label className="block py-2 font-semibold " htmlFor="github">
                  Github Username
                </label>
                <input
                  onChange={(e) => handle(e)}
                  value={data?.github}
                  className=" appearance-none w-full py-2 text-gray-700 leading-tight focus:outline-none"
                  id="github"
                  type="text"
                  placeholder="Your Github Username"
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
            {!isLoading && (
              <div className="flex md:justify-center justify-end items-center mb-5 md:mr-20">
                <input
                  type="submit"
                  value="SAVE"
                  className=" bg-blue-500 shadow-lg max-w-sm shadow-blue-500/50 rounded-lg px-10 py-3 text-white font-bold cursor-pointer hover:scale-110 transform duration-200"
                />
              </div>
            )}
            {isLoading && (
              <div className="flex md:justify-center justify-end items-center mb-5 md:mr-20">
                <button
                  type="submit"
                  value="Processing..."
                  className=" bg-blue-500 shadow-lg max-w-sm shadow-blue-500/50 rounded-lg px-10 py-3 text-white font-bold cursor-pointer hover:scale-110 transform duration-200 animate-spin"
                  disabled
                >
                  <svg
                    role="status"
                    className="inline w-4 h-4 mr-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                  Processing...
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
