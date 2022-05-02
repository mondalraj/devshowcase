import React, { useState } from "react";
import Head from "next/head";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

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
          router.push("/login");
        } else if (data.user.profile_id) {
          router.push(`/profile/${data.user.profile_id._id}`); //will change this after adding edit profile form route
        } else {
          router.push("/profileform");
        }
      });
  }, []);

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "success") {
      router.push(`/profile/${data.user.profile_id}`);
    } else {
      toast.error(data.message);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center overflow-hidden min-h-screen bg-gradient-to-l from-[#0ED2F7] to-[#094FFF]">
        <Head>
          <title>Login Page</title>
        </Head>
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="flex flex-row justify-center items-center bg-white w-11/12 lg:w-3/5 xl:h-1/2 shadow-2xl rounded-xl font-dm">
          <div className="md:flex flex-row md:justify-between ">
            <div className="flex flex-col grow relative">
              <form
                className="flex flex-col items-center w-full md:w-full p-5 relative"
                onSubmit={loginUser}
              >
                <a href="/" className="flex justify-center items-center">
                  <img
                    src="/images/logo.png"
                    alt=""
                    className="w-3/5 md:w-4/5 mt-3"
                  />
                </a>
                <h1 className="font-bold text-2xl md:text-xl">
                  Login to your Account
                </h1>
                <div className="p-4 m-6 text-center space-y-5">
                  <div className="relative border-solid border border-[#BCBCBC] rounded-md p-1 space-x-9">
                    <Icon
                      icon="cil:send"
                      color="#ccc"
                      className="pointer-events-none  w-6 h-6 absolute"
                    />
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                      className="ml-5 focus:outline-none"
                    />
                  </div>

                  <div className="relative border-solid border border-[#BCBCBC] rounded-md p-1 space-x-9">
                    <Icon
                      icon="bx:lock-alt"
                      color="#ccc"
                      className="pointer-events-none w-6 h-6 absolute text-gray-300"
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="ml-5 focus:outline-none"
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  value="Login"
                  className="bg-[#3770FF] w-3/4 text-white p-2 rounded-lg cursor-pointer hover:bg-[#2160ff]"
                />
                <p className="text-gray-400 mt-4">OR</p>
              </form>
              <div className="flex justify-center items-center">
                <button className="flex  space-x-2 mt-3 border-solid border border-[#DFD7D7] rounded-md p-2 mb-20 hover:bg-gray-100 justify-center w-3/5 items-center ">
                  <Icon icon="flat-color-icons:google" className="w-6 h-6" />
                  <p>Continue with Google</p>
                </button>
             
              <Link href="/signup">
                <button className="absolute bottom-0 bg-[#F6F6F6] text-[#3770FF] font-semibold text-sm rounded-xl w-max md:w-full p-3">
                  Not having an account? Sign Up
                </button>
              </Link>
            </div>
            </div>
            <div className="hidden md:block w-3/5 ">
              <img
                src="/images/thumbnail.svg"
                className="h-full object-cover rounded-br-xl"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
