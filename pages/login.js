import React, { useState } from "react";
import Head from "next/head";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleLogin from "react-google-login";

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

  const data = await userRes.json();

  return {
    props: {
      data,
    },
  };
}

export default function Login({ data }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

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
    if (data.status == "fail") {
      router.push("/login");
    } else if (data.user.profile_id) {
      router.push(`/profile/${data.user.profile_id._id}`); //will change this after adding edit profile form route
    } else {
      router.push("/profileform");
    }
  }, []);

  async function loginUser(event) {
    event.preventDefault();
    setLoading(true);

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
    setLoading(false);

    if (data.status === "success") {
      router.push(`/profile/${data.user.profile_id}`);
    } else {
      setPassword("");
      toast.error(data.message);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center overflow-hidden h-screen bg-gradient-to-l from-[#0ED2F7] to-[#094FFF]">
        <Head>
          <title>Login Page</title>
        </Head>
        <ToastContainer position="top-right" autoClose={2000} />
        <div className="flex justify-center items-center bg-white w-11/12 lg:w-3/5 shadow-2xl rounded-xl font-dm h-5/6">
          <div className="flex flex-col grow justify-between w-2/5 h-full">
            <form
              className="flex flex-col items-center w-full p-5 mt-5 md:mt-0"
              onSubmit={loginUser}
            >
              <a href="/" className="flex justify-center items-center">
                <img
                  src="/images/logo.png"
                  alt=""
                  className="w-2/3 md:w-4/5 mt-3"
                />
              </a>
              <h1 className="font-bold text-xl md:text-xl">
                Login to your Account
              </h1>
              <div className="py-4 px-2 m-6 text-center space-y-5">
                <div className="relative border-solid border border-[#BCBCBC] rounded-md p-1 pr-8">
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
                    className="ml-8 focus:outline-none"
                    required
                  />
                </div>

                <div className="relative border-solid border border-[#BCBCBC] rounded-md p-1 pr-8">
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
                    className="ml-8 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center mb-20">
                {!isLoading && (
                  <button
                    type="submit"
                    value="Login"
                    className="bg-[#3770FF] w-full text-white p-2 rounded-lg cursor-pointer hover:bg-[#2160ff]"
                  >
                    Login
                  </button>
                )}
                {isLoading && (
                  <button
                    type="submit"
                    value="Login"
                    className="bg-[#3770FF] w-full text-white p-2 rounded-lg cursor-pointer hover:bg-[#2160ff]"
                  >
                    <svg
                      role="status"
                      class="inline w-4 h-4 mr-3 text-white animate-spin"
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
                    Logging In...
                  </button>
                )}
                <p className="text-gray-400 m-4">OR</p>
                <GoogleLogin
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                  buttonText="Continue With Google"
                  className="googleButton"
                  onSuccess={handleLogin}
                  onFailure={handleFailure}
                  cookiePolicy={"single_host_origin"}
                ></GoogleLogin>
              </div>
            </form>
            <Link href="/signup">
              <button className="bg-[#F6F6F6] text-[#3770FF] font-semibold w-full p-3 text-sm md:text-base rounded-bl-xl rounded-br-xl shadow-lg shadow-blue-500">
                Not having an account? Sign Up
              </button>
            </Link>
          </div>
          <div className="hidden md:block w-3/5 h-full rounded-br-xl rounded-tr-xl">
            <img
              src="/images/thumbnail.svg"
              className="h-full w-full object-cover rounded-br-xl rounded-tr-xl"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}
