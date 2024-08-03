
import React from "react";
import Link from "next/link";

const PopUp = ({ title, text, link, linkText }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{text}</p>
        <Link href={link}>
          <a className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {linkText}
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PopUp;
