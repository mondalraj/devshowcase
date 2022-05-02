import { Icon } from "@iconify/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const router = useRouter();

  function logout() {
    fetch("/api/logout", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then(() => {
        setIsLoggedIn(false);
        // router.push("/");
        toast.success("Successfully Logged Out");
      });
  }

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
    <div className="overflow-hidden">
      <Head>
        <title>Devshowcase</title>
      </Head>
      <ToastContainer position="bottom-right" autoClose={2000} />
      <nav className="profile_navbar sticky top-0 right-0 left-0 bg-white w-screen h-16 flex justify-between items-center p-5 px-10 shadow-md z-10">
        <a href="/">
          <img
            src="../images/logo.png"
            alt=""
            className=" logo w-44 flex justify-between items-center mt-5"
          />
        </a>
        {isLoggedIn == true ? (
          <div className="flex justify-center items-center gap-5">
            <Link href= "/login">
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
            <div className="tooltip cursor-pointer" onClick={() => logout()}>
              <Icon icon="icons8:shutdown" className="text-2xl" />
              <span className="tooltiptext">Logout</span>
            </div>
          </div>
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
      <header className="flex justify-around items-center md:flex-row flex-col-reverse py-6">
        <div className="md:w-1/2 w-full text-black space-y-10 px-6 xl:px-20">
          <h2 className="text-3xl text-center md:text-left xl:text-5xl font-bold">
            &lt; Developer Portfolio /&gt;
          </h2>
          <h4 className="text-center md:text-left text-lg md:text-xl">
            This is where people who code, can connect, can showcase their
            development projects in front of whole coder's community.
            <br />
            Get hired by startups to build your developer expertise.
          </h4>
          <div className="bg-gradient-to-l from-[#00b7db] to-[#094FFF] px-8 py-2 text-md md:text-xl rounded-md mt-8 cursor-pointer text-white w-fit mx-auto md:mx-0">
            <Link href="/signup">
              {isLoggedIn === true ? "Go to Profile" : "Get Started"}
            </Link>
          </div>
        </div>
        <div className="w-2/3 md:w-1/2">
          <img src="../images/hero-image.jpg" alt="Hero Image" className="" />
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
