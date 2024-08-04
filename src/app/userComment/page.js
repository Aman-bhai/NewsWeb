"use client";
import React, { useEffect, useState } from "react";
import Card from "../components/CommentComponent"; 

const Page = () => {
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
    <div className="max-w-6xl mx-auto p-6 mt-11 dark:mt-0 dark:pt-11 dark:min-w-full dark:px-20 dark:bg-gray-800 dark:text-gray-300 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-10">Comment Page</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No comments available.</p>
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

export default Page;
