import { Icon } from "@iconify/react";
const { motion } = require("framer-motion");

export default function ConfirmModal({ message, setConfirm, cb }) {
  return (
    <div className="flex z-50 w-full h-screen justify-center items-center absolute">
      <motion.div
        animate={{ scale: [0, 1.2, 1] }}
        exit={{ scale: [1, 0] }}
        transition={{ type: "spring" }}
        className="relative rounded-lg shadow-md bg-gray-700 m-10"
      >
        <Icon
          icon="entypo:cross"
          className="absolute right-3 top-3 text-xl text-gray-400 cursor-pointer hover:bg-gray-500 hover:text-black rounded-full"
          onClick={() => setConfirm(false)}
        />
        <div className="p-6 text-center">
          <svg
            className="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 md:mr-8"
            onClick={() => {
              setConfirm(true);
              cb();
            }}
          >
            Yes, I'm sure
          </button>
          <button
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
            onClick={() => setConfirm(false)}
          >
            No, cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
