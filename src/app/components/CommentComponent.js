"use client";

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Spinner from '@/app/components/Spinner';
import PopUp from '@/app/components/PopUp';

const CommentComponent = () => {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchComments();
    }
  }, [status]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/news/comment?newsId=${newsId}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  if (status === 'unauthenticated') {
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
      {comments.length === 0 ? (
        <p>No comments available.</p>
      ) : (
        comments.map((c, index) => (
          <div key={index} className="mb-6 flex mt-2">
            <div className="flex-shrink-0 flex items-center justify-center">
              <img className="h-20 w-20 object-cover rounded-full" src={`https://avatar.iran.liara.run/username?username=${encodeURIComponent(c.email)}`} alt="User avatar" />
            </div>
            <div className="ml-4 flex flex-col justify-center">
              <p className="font-semibold text-gray-800">{c.email}</p>
              <p className="text-gray-700">{c.comment}</p>
              <p className="text-gray-500 text-sm mt-1">{new Date(c.date).toLocaleDateString()}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentComponent;
