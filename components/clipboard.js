import { CopyToClipboard } from "react-copy-to-clipboard";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const { motion } = require("framer-motion");

export default function Clipboard({ router }) {
  const notify = () => toast.info("Copied to clipboard", { toastId: "copied" });

  return (
    <CopyToClipboard text={`https://devshowcase-22.vercel.app${router.asPath}`}>
      <motion.div
        whileTap={{ scale: 1.5 }}
        className="bg-zinc-200 w-10 h-10 rounded-sm mx-2 flex justify-center items-center cursor-pointer shadow-md"
        onClick={notify}
      >
        <Icon
          icon="clarity:share-line"
          className="text-3xl hover:text-blue-800"
        />
      </motion.div>
    </CopyToClipboard>
  );
}
