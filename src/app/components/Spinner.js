"use client"
import React from "react";

const Spinner = () => (
  <div className="flex items-center justify-center mt-6 min-h-screen">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>
);

export default Spinner;
