import { useState } from "react";

function HireUsModal({ setModal, toEmail, toName }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    fetch("/api/sendMessage", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: email,
        message: message,
        toEmail,
        toName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessageSent(true);
        console.log(data);
        setTimeout(function () {
          setModal(false);
        }, 2500);
      });
  };

  return (
    <>
      <div
        className="bg-black/40 flex  z-50 w-full h-full justify-center absolute"
        onClick={() => setModal(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-blue-500 md:w-1/3 w-5/6 h-[30rem]  rounded-xl px-5 flex flex-col justify-center items-center top-[20vh] relative"
        >
          <h1 className="font-bold text-3xl text-white pt-3 pb-2 tracking-wider">
            Get in Touch!
          </h1>
          <h3 className="text-base md:text-lg text-white mb-1 md:tracking-wide">
            Have an enquiry or feedback for me? <br />
            Fill out the form below to contact me
          </h3>
          <form
            onSubmit={sendEmail}
            className="w-5/6 h-[18rem] bg-slate-50 translate-y-5 rounded-md"
          >
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
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pb-2 px-5">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium"
              >
                Message
              </label>
              <textarea
                className="placeholder:italic placeholder:text-slate-400 block bg-gray-200/25 w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm h-20"
                placeholder="Type in your message..."
                style={{ resize: "none" }}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center mt-2">
              <input
                type="submit"
                value={messageSent ? "Message Sent" : "Send Message"}
                className={`${
                  messageSent ? ` bg-green-600 ` : ` bg-blue-500 `
                } shadow-xl max-w-sm rounded-lg px-3 py-1 text-white font-medium cursor-pointer hover:scale-110 transform duration-200 text-md mb-5`}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default HireUsModal;
