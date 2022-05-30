import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { removeCookies } from "cookies-next";

export default function Home({ userData }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

  function logout() {
    removeCookies("devshowcase_jwt");
    setIsLoggedIn(false);
    // router.push("/");
    router.reload();
  }

  useEffect(() => {
    if (userData.status == "fail") {
      setIsLoggedIn(false);
    } else {
      setUser(userData.user);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between md:h-screen overflow-hidden">
      <Head>
        <title>Devshowcase</title>
      </Head>
      <ToastContainer position="bottom-right" autoClose={2000} />
      {/* <nav className="profile_navbar sticky top-0 right-0 left-0 bg-white w-screen h-16 flex justify-between items-center p-5 px-4 md:px-10 shadow-md z-10"> */}
      <nav className="bg-white w-full flex justify-between items-center px-4 md:px-10 shadow-md">
        <a href="/">
          <img
            src="../images/logo.png"
            alt=""
            className=" logo w-44 flex justify-between items-center mt-5"
          />
        </a>
        {isLoggedIn == true ? (
          <div className="flex justify-center items-center gap-5">
            <Link
              href={
                user.profile_id
                  ? `/profile/${user.profile_id._id}`
                  : "/profileform"
              }
            >
              <div className="flex gap-2 items-end">
                <button className="hidden sm:block text-lg">
                  {user.username}
                </button>
                <Icon
                  icon="ic:baseline-account-circle"
                  className="text-3xl text-[#094FFF]"
                />
              </div>
            </Link>
            <div className="tooltip cursor-pointer" onClick={() => logout()}>
              <Icon icon="icons8:shutdown" className="text-2xl" />
              <span className="tooltiptext shadow-md">Logout</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center gap-5">
            <div className="cursor-pointer text-md md:text-xl px-2 md:px-5 py-1">
              <Link href="/login">Login</Link>
            </div>
            <div className="cursor-pointer text-white text-md md:text-lg md:px-5 bg-[#1b5bff] py-1 rounded-lg px-2">
              <Link href="/signup">Sign up</Link>
            </div>
          </div>
        )}
      </nav>
      <header className="flex justify-around items-center md:flex-row flex-col-reverse py-6 h-full">
        <div className="md:w-1/2 w-full text-black space-y-6 px-6 xl:px-20">
          <h2 className="text-2xl text-center xl:text-5xl font-bold w-fit">
            &lt; Developer Portfolio /&gt;
            <div className="text-lg md:text-xl mt-1 text-center italic text-slate-600">
              For the developers, by the developers
            </div>
          </h2>
          <h4 className="text-center md:text-left text-md md:text-lg">
            This is where people who code, can connect, can showcase their
            development projects in front of whole coder's community.
            <br />
            <div className="py-4 text-[#094FFF] font-semibold text-md md:text-xl">
              Get hired by startups to build your developer expertise.
            </div>
          </h4>
          <div className="bg-gradient-to-l from-[#00badf] to-[#0062ff] px-8 py-2 text-md md:text-xl rounded-md mt-8 cursor-pointer text-white w-fit mx-auto md:mx-0">
            <Link
              href={
                user.profile_id
                  ? `/profile/${user.profile_id._id}`
                  : isLoggedIn
                  ? "/profileform"
                  : "/signup"
              }
            >
              {isLoggedIn === true ? "Go to Profile" : "Get Started"}
            </Link>
          </div>
        </div>
        <div className="w-2/3 md:w-1/3">
          <img src="../images/hero-image.jpg" alt="Hero Image" />
        </div>
      </header>
      <footer className="w-full border-t-2 shadow-lg py-5 px-10 flex flex-col-reverse md:flex-row gap-4 justify-between items-center bg-white mt-10 xl:mt-0">
        <div>Devshowcase @ 2022</div>
        <div className="flex justify-center items-center gap-4">
          <Link href={`/`}>About</Link>
          <Link href={`/`}>Team</Link>
          <Link href={`/`}>Privacy</Link>
          <Link href={`/`}>Careers</Link>
        </div>
      </footer>
    </div>
  );
}

const dev = process.env.NODE_ENV !== "production";

const server = dev
  ? "http://localhost:3000"
  : "https://devshowcase-22.vercel.app";

export async function getServerSideProps({ req }) {
  const userRes = await fetch(`${server}/api/getUser`, {
    method: "GET",
    withCredentials: true,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Cookie: req.headers.cookie,
    },
  });

  const userData = await userRes.json();

  return {
    props: {
      userData,
    },
  };
}
