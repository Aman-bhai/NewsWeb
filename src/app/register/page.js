"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

const page = () => {
  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");

  const [creatingUser, setcreatingUser] = useState(false);
  const [userCreated, setuserCreated] = useState(false);
  const [error, seterror] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror(false);
    setcreatingUser(true);
    setuserCreated(false);

    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        seterror(true);
        reject();
      } else {
        setuserCreated(true);
        resolve();
      }
      setcreatingUser(false);
    });
    await toast.promise(promise, {
      loading: "Sending...",
      success: "SignUp Success!",
      error: "Validation Error !",
    });

    setemail("");
    setpassword("");
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            {" "}
            Or
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500 pl-1"
            >
              Already Have an Account?
            </Link>
          </p>

          {userCreated && (
            <div className="my-4 text-center bg-red-500 w-fit text-white mx-auto p-2 px-4 rounded-lg">
              Now you can
              <Link className="underline" href="/login">
                {" "}
                Login &raquo;
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    disabled={creatingUser}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    disabled={creatingUser}
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={creatingUser}
                  onClick={handleSubmit}
                >
                  SignUp
                </button>
              </div>
            </form>
            <div className="mt-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm mb-2">
                  <span className="px-2 bg-gray-100 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                >
                  <div className="flex items-center justify-center">
                    <FaGoogle />
                    <span className="ml-2">Google</span>
                  </div>{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
