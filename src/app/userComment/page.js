"use client";
import React, { useEffect, useState } from "react";

const Card = ({ news, isOpen, settoggleCard }) => {
  return (
    <div className="relative">
      <div className="bg-white bg-opacity-80 backdrop-blur-md border border-gray-200 rounded-lg overflow-hidden mb-6 shadow-lg transition-transform transform hover:scale-105">
        <img
          src={news.image || "/assets/general_news.webp"}
          alt={news.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-black mb-2">
            {news.title}
          </h3>
          <p className="text-gray-700 mb-4">{news.description}</p>
          <button
            onClick={() => settoggleCard(isOpen ? null : news._id)}
            className="text-indigo-700 hover:text-indigo-900 font-medium"
          >
            {isOpen ? "Hide Comments" : "Show Comments"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full z-10 bg-gray-100 bg-opacity-95 p-4 rounded-lg shadow-lg mt-2">
          <h4 className="text-lg font-bold text-gray-800 mb-4">Comments</h4>
          {news.comments && news.comments.length > 0 ? (
            news.comments.map((comment, index) => (
              <div key={index} className="flex items-start mb-4">
                <img
                  src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                    comment.userEmail
                  )}`}
                  alt={`${comment.userEmail} avatar`}
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {comment.userEmail}
                  </p>
                  <p className="text-sm text-gray-600">{comment.userComment}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No comments available.</p>
          )}
        </div>
      )}
    </div>
  );
};

const page = () => {
  const [toggleCard, settoggleCard] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/userComment");
        const result = await response.json();

        const groupedData = result.comments.reduce((acc, item) => {
          const newsId = item._doc._id;
          if (!acc[newsId]) {
            acc[newsId] = {
              ...item._doc,
              comments: [{ userEmail: item.userEmail, userComment: item.userComment }],
            };
          } else {
            acc[newsId].comments.push({ userEmail: item.userEmail, userComment: item.userComment });
          }
          return acc;
        }, {});

        setData(Object.values(groupedData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-11">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length === 0 ? (
          <p className="text-gray-500">No comments available.</p>
        ) : (
          data.map((item) => (
            <Card
              key={item._id}
              news={item}
              isOpen={toggleCard === item._id}
              settoggleCard={settoggleCard}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default page;
