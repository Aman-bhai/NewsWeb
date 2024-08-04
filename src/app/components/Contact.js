"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const Contact = (props) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Sending...",
      success: "Message is Successfully Sended",
      error: "Error: Empty name or invalid email format",
    });

    setname("");
    setemail("");
    setmessage("");
  };

  return (
    <div className="my-6 dark:bg-gray-800 dark:text-gray-300">
      <div className="grid sm:grid-cols-2 items-center gap-16 p-8  mx-auto max-w-4xl bg-white dark:bg-gray-700 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] dark:shadow-[0_2px_10px_-3px_rgba(105,105,105)]  rounded-md text-[#333]">
        <div>
          <h1 className="text-3xl font-extrabold dark:text-gray-400 ">Contact Us</h1>
          <p className="text-sm mt-3 dark:text-gray-400">
            Please Don't Hesitate and Feel Free To Contact Us.
          </p>
          <div className="mt-12">
            <h2 className="text-lg font-extrabold dark:text-gray-400">Email</h2>
            <ul className="mt-3">
              <li className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="#007bff"
                    viewBox="0 0 479.058 479.058"
                  >
                    <path
                      d="M434.146 59.882H44.912C20.146 59.882 0 80.028 0 104.794v269.47c0 24.766 20.146 44.912 44.912 44.912h389.234c24.766 0 44.912-20.146 44.912-44.912v-269.47c0-24.766-20.146-44.912-44.912-44.912zm0 29.941c2.034 0 3.969.422 5.738 1.159L239.529 264.631 39.173 90.982a14.902 14.902 0 0 1 5.738-1.159zm0 299.411H44.912c-8.26 0-14.971-6.71-14.971-14.971V122.615l199.778 173.141c2.822 2.441 6.316 3.655 9.81 3.655s6.988-1.213 9.81-3.655l199.778-173.141v251.649c-.001 8.26-6.711 14.97-14.971 14.97z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
                <Link
                  href="mailto:amansoni18860@gmail.com"
                  className="text-sm ml-3 dark:text-gray-400"
                >
                  <small className="block">Mail</small>
                  <strong>amansoni18860@gmail.com</strong>
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-12">
            <h2 className="text-lg font-extrabold dark:text-gray-400">Socials</h2>
            <ul className="flex mt-3 space-x-4">
              <li className="bg-[#e6e6e6cf] dark:bg-indigo-200 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                <Link
                  href={`${props.WHATSAPP}`}
                  className="cursor-pointer  text-lg rounded-full "
                >
                  <FaSquareWhatsapp className="h-6 w-6 text-blue-500 hover:text-blue-700" />
                </Link>
              </li>
              <li className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-[#e6e6e6cf] dark:bg-indigo-200">
                <Link
                  href={`${props.LINKEDIN}`}
                  className="cursor-pointer  text-lg rounded-full"
                >
                  <FaLinkedin className="h-6 w-6 text-blue-500 hover:text-blue-700" />
                </Link>
              </li>
              <li className="h-10 w-10 rounded-full flex items-center justify-center shrink-0 bg-[#e6e6e6cf] dark:bg-indigo-200">
                <Link
                  href={`${props.X}`}
                  className="cursor-pointer text-lg rounded-full"
                >
                  <FaSquareXTwitter className="h-6 w-6 text-blue-500 hover:text-blue-700" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <form className="ml-auo space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full rounded-md py-2.5 px-4 border text-sm dark:bg-gray-400 dark:text-gray-950 dark:outline-none dark:placeholder-gray-700"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md py-2.5 px-4 border text-sm dark:bg-gray-400 dark:text-gray-950 dark:outline-none dark:placeholder-gray-700"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          <textarea
            placeholder="Message"
            rows="6"
            className="w-full rounded-md px-4 border text-sm pt-2.5 dark:bg-gray-400 dark:text-gray-950 dark:outline-none dark:placeholder-gray-700"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
          ></textarea>
          <button
            type="button"
            className="text-white bg-blue-600 hover:bg-blue-800 font-semibold rounded-md text-sm px-4 py-2.5 w-full"
            onClick={handleSubmit}
          >
            <div className="flex justify-center items-center">
              <span className="mx-2">Send</span>
              <IoSend />
            </div>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
