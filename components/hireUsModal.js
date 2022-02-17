import React from "react";

function HireUsModal() {
  return (
    <div className="bg-black/30 flex fixed z-50 w-full h-full justify-center items-center">
      <div className="bg-blue-500 md:w-1/3 w-5/6 h-2/5 md:h-1/2 rounded-xl px-5 flex flex-col justify-center items-center">
        <h1 className="font-bold text-3xl text-white pt-5 pb-2 tracking-wider">
          Get in Touch!
        </h1>
        <h3 className="text-lg text-white mb-1 md:tracking-wide">
          Have an enquiry or feedback for me? <br />
          Fill out the form below to contact me
        </h3>
        <div className="w-5/6 h-3/4 bg-slate-50 translate-y-5 rounded-md">
          <div className="pb-5 px-5 pt-3">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-200/25 focus:outline-none border-2 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Type your email..."
              required
            />
          </div>
          <div className="pb-2 px-5">
            <label htmlFor="message" className="block mb-2 text-sm font-medium">
              Message
            </label>
            <textarea
              className="placeholder:italic placeholder:text-slate-400 block bg-gray-200/25 w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm h-20"
              placeholder="Type in your message..."
              style={{ resize: "none" }}
              required
            />
          </div>
          <div className="flex justify-center items-center mt-2">
            <input
              type="submit"
              value="Send Message"
              className=" bg-blue-500 shadow-lg max-w-sm shadow-blue-500/50 rounded-lg px-3 py-1 text-white font-medium cursor-pointer hover:scale-110 transform duration-200 text-sm mb-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HireUsModal;