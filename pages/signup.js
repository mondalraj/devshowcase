import React, { useState } from "react";
import Head from "next/head";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import GoogleLogin from "react-google-login";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (googleData) => {
    const response = await fetch("/api/googleLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email: googleData.profileObj.email,
        password: "Continued with Google",
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      if (data.user.profile_id) {
        router.push(`/profile/${data.user.profile_id}`);
      } else {
        router.push("/profileform");
      }
    } else {
      toast.error(data.message);
    }
  };

  const handleFailure = (result) => {
    // toast.error(result.error);
    console.log(result);
  };

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
          router.push("/signup");
        } else if (data.user.profile_id) {
          router.push(`/profile/${data.user.profile_id._id}`); //will change this after adding edit profile form route
        } else {
          router.push("/profileform");
        }
      });
  }, []);

  async function registerUser(event) {
    event.preventDefault();

    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      router.push("/profileform");
    } else {
      toast.error(data.message ? data.message : "Something went wrong");
    }
  }

  return (
    <>
      <div className="flex justify-center items-center overflow-hidden h-screen bg-gradient-to-l from-[#0ED2F7] to-[#094FFF]">
        <Head>
          <title>Signup Page</title>
        </Head>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex justify-center items-center bg-white w-11/12 lg:w-3/5 h-5/6 shadow-2xl rounded-xl font-dm">
          {/* <div className="md:flex flex-row md:justify-between "> */}
          <div className="hidden md:block w-3/5 h-full rounded-bl-xl rounded-tl-xl">
            <img
              src="/images/thumbnail.svg"
              className="h-full w-full object-cover rounded-bl-xl rounded-tl-xl"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-between grow h-full md:w-2/5 w-5/6">
            <form
              className="flex flex-col items-center w-full p-6"
              onSubmit={registerUser}
            >
              <a href="/" className="flex justify-center items-center">
                <img
                  src="/images/logo.png"
                  alt=""
                  className="w-3/5 md:w-4/5 mt-3"
                />
              </a>
              <h1 className="font-bold text-lg md:text-xl">
                Create a new Account
              </h1>
              <div className="m-4 px-6 md:p-4 md:m-6 text-center space-y-5">
                <div className="relative border-solid border border-[#BCBCBC] rounded-md p-1">
                  <Icon
                    icon="cil:send"
                    color="#ccc"
                    className="pointer-events-none  w-6 h-6 absolute"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    placeholder="Your Email"
                    className="md:ml-5 focus:outline-none ml-8"
                  />
                </div>

                <div className="relative border-solid border border-[#BCBCBC] rounded-md p-1">
                  <Icon
                    icon="ic:baseline-account-circle"
                    color="#3770ff"
                    className="pointer-events-none  w-6 h-6 absolute"
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    name="username"
                    id="username"
                    placeholder="Your Username"
                    className="md:ml-5 focus:outline-none ml-8"
                  />
                </div>

                <div className="relative border-solid border border-[#BCBCBC] rounded-md p-1">
                  <Icon
                    icon="bx:lock-alt"
                    color="#ccc"
                    className="pointer-events-none  w-6 h-6 absolute text-gray-300"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    id="password"
                    placeholder="Create Password"
                    className="md:ml-5 focus:outline-none ml-8"
                  />
                </div>
                <p className="text-[#8C8C8C] text-sm md:text-xs md:font-semibold">
                  By signing up, confirm that you’ve read and accepted our{" "}
                  <a className="text-[#3770FF]">User Notice</a> and{" "}
                  <a className="text-[#3770FF]">Privacy Policy</a>
                </p>
              </div>
              <div className="flex flex-col justify-center items-center mb-5 md:mb-0">
                <input
                  type="submit"
                  value="Register"
                  className="bg-[#3770FF] w-full text-white p-2 rounded-lg cursor-pointer hover:bg-[#2160ff]"
                />
                <p className="text-gray-400 m-1 md:m-4">OR</p>
                <GoogleLogin
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                  buttonText="Continue With Google"
                  onSuccess={handleLogin}
                  className="googleButton"
                  onFailure={handleFailure}
                  cookiePolicy={"single_host_origin"}
                ></GoogleLogin>
              </div>
            </form>
            {/* <div className="flex justify-center items-center"> */}
            {/* <button className="flex  space-x-2 border-solid border border-[#DFD7D7] rounded-md p-2 mb-20 hover:bg-gray-100 justify-center w-3/5 items-center ">
                  <Icon icon="flat-color-icons:google" className="w-6 h-6" />
                  <p>Continue with Google</p>
                </button> */}

            <Link href="/login">
              <button className="bg-[#F6F6F6] text-[#3770FF] font-semibold text-sm rounded-xl w-full p-3 ">
                Already having an account? Log In
              </button>
            </Link>
            {/* </div> */}
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
