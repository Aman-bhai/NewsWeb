import React from "react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";

const page = () => {
  return (
    <>
      <section className="body-font px-12 sm:px-24 py-10 z-0 dark:bg-gray-800 dark:text-gray-300 min-h-screen ">
        <Contact
          LINKEDIN={process.env.LINKEDIN}
          X={process.env.X}
          WHATSAPP={process.env.WHATSAPP}
        />
      </section>{" "}
    </>
  );
};

export default page;
