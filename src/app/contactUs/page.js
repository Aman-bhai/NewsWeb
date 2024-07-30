import React from "react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";

const page = () => {
  return (
    <>
      <section className="bg-gray-100 body-font px-12 sm:px-24 py-10 z-0 ">
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
