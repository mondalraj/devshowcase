import React, { useState } from "react";
import Head from "next/head";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/api/login", {
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
      alert(data.message);
      router.push("/profile");
    } else {
      alert(data.message);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center overflow-hidden min-h-screen bg-gradient-to-l from-[#0ED2F7] to-[#094FFF]">
        <Head>
          <title>Login Page</title>
        </Head>

        <div className="flex flex-row justify-center items-center bg-white w-11/12 lg:w-3/5 xl:h-1/2 shadow-2xl rounded-xl">
          <div className="md:flex flex-row md:justify-between ">
            <form
              className="flex flex-col items-center w-full md:w-2/5 p-5 relative"
              onSubmit={loginUser}
            >
              <img
                src="/images/logo.png"
                alt=""
                className="w-3/5 md:w-4/5 mt-3"
              />
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
              <button className="flex flex-row space-x-2 mt-3 border-solid border border-[#DFD7D7] rounded-md p-2 mb-10 hover:bg-gray-100">
                <Icon icon="flat-color-icons:google" className="w-6 h-6" />
                <p>Continue with Google</p>
              </button>
              <Link href="/signup">
                <button className="absolute bottom-0 bg-[#F6F6F6] text-[#3770FF] font-semibold rounded-xl w-10/12 md:w-full p-3">
                  Not having an account? Sign Up
                </button>
              </Link>
            </form>

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
