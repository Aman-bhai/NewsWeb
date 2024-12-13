"use client";
import React from "react";

const Card = ({ news, isOpen, settoggleCard }) => {
  return (
    <div className="relative">
      <div className="bg-white dark:bg-gray-700 bg-opacity-80 dark:bg-opacity-90 backdrop-blur-md border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden mb-6 shadow-lg transition-transform transform hover:scale-105">
        <img
          src={news.image || "/assets/general_news.webp"}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
            {news.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {news.desc && (news.desc.length <= 50 ? news.desc : `${news.desc.substring(0, 50)}...`)}
          </p>
          <button
            onClick={() => settoggleCard(isOpen ? null : news._id)}
            className="text-indigo-700 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium"
          >
            {isOpen ? "Hide Comments" : "Show Comments"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute inset-0 top-16 left-0 w-full z-20 bg-gray-200 dark:bg-gray-900 dark:text-gray-300 bg-opacity-90 p-4 rounded-lg shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">Comments</h4>
            <button
              onClick={() => settoggleCard(null)} 
              className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
            >
              &times; 
            </button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {news.comments && news.comments.length > 0 ? (
              news.comments.map((comment, index) => (
                <div key={index} className="flex items-start mb-4 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm">
                  <img
                    src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                      comment.userEmail
                    )}`}
                    alt={`${comment.userEmail} avatar`}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      {comment.userEmail}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{comment.userComment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-700 dark:text-gray-400">No comments available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
