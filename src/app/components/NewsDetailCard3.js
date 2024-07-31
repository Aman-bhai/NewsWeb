"use client";

import { useNews } from "@/app/context/NewsContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import PopUp from "./PopUp";
import toast from "react-hot-toast";
import Spinner from "./Spinner";

const NewsDetailCard3 = () => {
  const { selectedNews } = useNews();
  const router = useRouter();

  useEffect(() => {
    if (!selectedNews) {
      router.push("/");
    }
  }, [selectedNews, router]);

  if (!selectedNews) {
    return (
      <div className="text-center mx-auto">
        <Spinner />
      </div>
    );
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

  const session = useSession();

  if (session?.status === "unauthenticated") {
    return (
      <PopUp
        title="Login Required"
        text="You need to log in to access this page."
        link="/login"
        linkText="Login"
      />
    );
  }

  const email = session?.data?.user?.email;

  const [comment, setcomment] = useState("");
  const [prevComments, setprevComments] = useState([]);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setloading(true);
        const response = await fetch("/api/comments");
        let data = await response.json();
        console.log(data);
        setprevComments(data.Comments);
        setloading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, []);

  const postCommentBtn = async (e) => {
    e.preventDefault();

    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/comments/addComment", {
        method: "POST",
        body: JSON.stringify({ email, comment }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        resolve();
        const data = await response.json();
        setprevComments((prev) => [...prev, data]);
        setcomment("");
      } else {
        reject();
      }

    });

    await toast.promise(promise, {
      loading: "Uploading...",
      success: "Comment is Successfully Uploaded!",
      error: "Error",
    });

   
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-screen-md h-80 flex justify-center items-center mb-6">
          <img
            src={!image ? "/assets/general_news.webp" : image}
            alt="News"
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

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
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Read more
          </button>
        </div>
      </div>
      <div className="mt-6 p-6 border-t bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Comments</h2>

        {!loading &&
          prevComments.map((item, key) => (
            <div key={key} className="mb-6 flex mt-2">
              <div className="flex-shrink-0 flex items-center justify-center">
                <img
                  className="h-20 w-20 object-cover rounded-full"
                  src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(item.email)}`}
                  alt="User avatar"
                />
              </div>
              <div className="ml-4 flex flex-col justify-center">
                <p className="font-semibold text-gray-800">{item.email}</p>
                <p className="text-gray-700">{item.comment[0]}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {new Date(item.date[0]).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Add a Comment
          </h3>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={postCommentBtn}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailCard3;
