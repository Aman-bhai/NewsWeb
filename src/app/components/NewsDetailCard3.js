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
  const [comment, setComment] = useState("");
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const session = useSession();
  const email = session?.data?.user?.email;
  const { title, src_name, image, desc, content, date, author, url, _id } =
    selectedNews || {};

  useEffect(() => {
    if (!selectedNews) {
      router.push("/");
    }
  }, [selectedNews, router]);

  useEffect(() => {
    const fetchCommentsAndLikes = async () => {
      if (!title || !src_name || !email) return;

      try {
        const commentsResponse = await fetch("/api/comments");
        const commentsData = await commentsResponse.json();

        const userComment = commentsData.Comments.find(
          (comment) => comment.email === email
        );
        if (userComment) {
          setLikes(userComment.likes || []);
          setIsLiked(userComment.likes.includes(_id));
        }
      } catch (error) {
        console.error("Error fetching comments or likes:", error);
      }
    };

    fetchCommentsAndLikes();
  }, [title, src_name, email, _id]);

  const saveNews = async () => {
    try {
      const response = await fetch("/api/news", {
        method: "POST",
        body: JSON.stringify({title,content,image,url,desc,src_name,author,email }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to save news.");
    } catch (error) {
      console.error("Error saving news:", error);
    }
  };

  const postCommentBtn = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("You must be logged in to post a comment.");
      return;
    }

    try {
      await saveNews();

      const response = await fetch("/api/comments/addComment", {
        method: "POST",
        body: JSON.stringify({ email, comment, title, src_name }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const data = await response.json();
        setComment("");
        toast.success("Comment successfully posted!");
      } else {
        toast.error("Failed to post comment.");
      }
    } catch (error) {
      toast.error("An error occurred while posting the comment.");
      console.error("Error posting comment:", error);
    }
  };

  const handleLike = async () => {
    if (!email) {
      toast.error("You must be logged in to like this news.");
      return;
    }

    try {
      await saveNews();

      const res = await fetch("/api/news/like", {
        method: "POST",
        body: JSON.stringify({ email, title, src_name, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        const data = await res.json();
        const newsId = data._id;
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        setLikes(
          newIsLiked ? [...likes, newsId] : likes.filter((id) => id !== newsId)
        );

        const likeRes = await fetch("/api/news/like/addLike", {
          method: "POST",
          body: JSON.stringify({ email, title, src_name, like: newIsLiked }),
          headers: { "Content-Type": "application/json" },
        });

        if (likeRes.ok) {
          toast.success(
            newIsLiked ? "Liked successfully!" : "Unliked successfully!"
          );
        } else {
          toast.error("Failed to update like status.");
        }
      } else {
        toast.error("Failed to fetch news ID.");
      }
    } catch (error) {
      toast.error("An error occurred while liking/unliking.");
      console.error("Error handling like:", error);
    }
  };

  if (!selectedNews) {
    return (
      <div className="text-center mx-auto">
        <Spinner />
      </div>
    );
  }

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
              Published on:{" "}
              <span className="font-medium text-gray-800">{date}</span>
            </p>
          </div>
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => window.open(url, "_blank")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Read more
            </button>
            <button
              onClick={handleLike}
              className={`px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 ${
                isLiked
                  ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500"
                  : "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500"
              }`}
            >
              {isLiked ? "Unlike" : "Like"}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-6 p-6 border-t bg-white rounded-lg shadow-md">

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Add a Comment
          </h3>
          <textarea
            className="w-full h-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
            placeholder="Write your comment here..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
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
