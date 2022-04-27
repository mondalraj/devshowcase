import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
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
        } else {
          setUser(data.user);
          setIsLoggedIn(true);
        }
      });
  }, []);

  return (
    <>
      <nav className="profile_navbar absolute top-0 right-0 left-0 bg-white/60 w-screen h-16 flex justify-between items-center p-5 px-10 shadow-md z-10">
        <a href="/">
          <img
            src="../images/logo.png"
            alt=""
            className=" logo w-44 flex justify-between items-center mt-5"
          />
        </a>
        {isLoggedIn == true ? (
          <Link href={`/profile/${user.profile_id._id}`}>
            <div className="flex gap-2 items-end">
              <button
                className="hidden sm:block text-lg"
                onClick={() => console.log("Clicked")}
              >
                {user.username}
              </button>
              <Icon
                icon="ic:baseline-account-circle"
                className="text-3xl text-[#094FFF]"
              />
            </div>
          </Link>
        ) : (
          <div className="flex justify-center items-center gap-5">
            <div className="cursor-pointer text-lg px-5 py-1">
              <Link href="/login">Login</Link>
            </div>
            <div className="cursor-pointer text-white text-lg bg-[#1b5bff] py-1 rounded-lg px-5">
              <Link href="/signup">Sign up</Link>
            </div>
          </div>
        )}
      </nav>
      <header className="relative h-screen">
        {/* <video
          className="object-cover h-full w-full absolute -z-10"
          src="../video.mp4"
          autoPlay
          loop
          muted
        /> */}
        <div className="h-full w-full absolute -z-9 bg-gradient-to-l"></div>
        <div className="text-black  flex justify-center items-center h-full w-full flex-col z-10">
          <h2 className="text-black text-5xl font-semibold z-50">
            &lt; Portfolio for Developers /&gt;
          </h2>
          <h4 className="text-black text-center text-xl max-w-4xl py-8 z-50">
            This is where people who code, can connect, can showcase their
            development projects in front of whole coder's community.
            <br />
            Get hired by startups to build your developer expertise.
          </h4>
          <Link href="/signup">
            <div className="bg-gradient-to-l from-[#00b7db] to-[#094FFF] px-10 py-3 text-xl rounded-md mt-8 z-50 cursor-pointer text-white">
              {isLoggedIn === true ? "Go to Profile" : "Get Started"}
            </div>
          </Link>
        </div>
      </header>
      <footer>Footer</footer>
    </>
  );
}
