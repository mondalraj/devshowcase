import "tailwindcss/tailwind.css";
import "../global.css";
import NextNProgress from "nextjs-progressbar";

const { AnimatePresence } = require("framer-motion");

function App({ Component, pageProps, router }) {
  return (
    <>
      <NextNProgress height={5} stopDelayMs={200} />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  );
}

export default App;
