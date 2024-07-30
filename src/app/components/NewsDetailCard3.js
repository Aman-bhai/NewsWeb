"use client";

import { useNews } from "@/app/context/NewsContext";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const NewsDetailCard3 = () => {
  const { selectedNews } = useNews();
  const router = useRouter();

  useEffect(() => {
    if (!selectedNews) {
      router.push("/");
    }
  }, [selectedNews, router]);

  if (!selectedNews) {
    return <div>No news selected</div>;
  }

  const {
    title,
    image,
    desc,
    date,
    author,
    url,
    src_name,
    content,
  } = selectedNews;

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        {/* Image */}
        <div className="relative w-full max-w-screen-md h-80 flex justify-center items-center mb-6">
          <img
            src={!image ? "/assets/general_news.webp" : image}
            alt="News"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-start w-full max-w-screen-md">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">{title}</h1>
          <p className="text-gray-700 mb-4">{desc}</p>
          <p className="text-gray-500 mb-4">{content}</p>
          <div className="mb-4">
            <p className="text-sm text-gray-500">
              Author:{" "}
              <span className="font-medium text-gray-800">{author}</span>
            </p>
            <p className="text-sm text-gray-500">
              Source:{" "}
              <span className="font-medium text-gray-800">{src_name}</span>
            </p>
            <p className="text-sm text-gray-500">
              Source ID: <span className="font-medium text-gray-800">{1}</span>
            </p>
            <p className="text-sm text-gray-500">
              Published on:{" "}
              <span className="font-medium text-gray-800">{date}</span>
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.open(url, "_blank");
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            Read more
          </button>
        </div>
      </div>
      <div className="mt-6 p-6 border-t bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Comments</h2>

        {/* Previous Comments */}
        <div className="mb-6">
          <div className="border-b border-gray-200 pb-4 mb-4">
            <p className="font-semibold text-gray-800">John Doe</p>
            <p className="text-gray-700">Great article! Very informative.</p>
            <p className="text-gray-500 text-sm mt-1">July 29, 2024</p>
          </div>
          <div className="border-b border-gray-200 pb-4 mb-4">
            <p className="font-semibold text-gray-800">Jane Smith</p>
            <p className="text-gray-700">
              I found this news to be quite helpful. Thanks for sharing!
            </p>
            <p className="text-gray-500 text-sm mt-1">July 28, 2024</p>
          </div>
        </div>

        {/* Add Comment Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Add a Comment
          </h3>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Write your comment here..."
          ></textarea>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailCard3;
