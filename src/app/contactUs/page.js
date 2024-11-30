import React from "react";
import Contact from "../components/Contact";

const page = () => {
  return (
    <>
      <section className="body-font px-12 sm:px-24 py-10 z-0 dark:bg-gray-800 dark:text-gray-300 min-h-screen ">
        <Contact
          LINKEDIN={process.env.LINKEDIN_URL}
          X={process.env.X_URL}
          WHATSAPP={process.env.WHATSAPP_URL}
        />
      </section>{" "}
    </>
  );
};

export default page;
