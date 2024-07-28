"use client"

import React, { useEffect, useRef, useState } from "react";

import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseCircle } from "react-icons/io5";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {

  const router = useRouter();
  const [search, setsearch] = useState("");
  const [hamburger, setHamburger] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { data: session, status } = useSession();

  const handleHamburger = () => {
    setHamburger(!hamburger);
  };

  const closeMenu = () => {
    setHamburger(false);
  };

  const navigateSearch = () => {
    router.push(`/search/${search}`);
  }

  const LogOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }
  


  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return (
    <nav className="bg-gray-300 shadow">
      <div className="flex items-center justify-between flex-col lg:flex-row lg:flex-wrap py-4 lg:px-12" id="imp">
        <div className="flex items-center justify-between w-full lg:w-auto px-6 lg:px-0">
        <div className="flex items-center mr-6" style={{margin:"marginAuto"}}>

        <img
              src="/assets/svg/logo-no-background.svg"
              alt="Logo"
              className="h-8 rounded-md block"
            />
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                onClick={() => setDropdown(!dropdown)}
                className="font-semibold text-xl tracking-tight cursor-pointer text-gray-800 focus:outline-none"
              >
                NewsDaily
              </button>
              {dropdown && (
                <div className="absolute top-10 left-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdown(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/users"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setDropdown(false)}
                  >
                    Users
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <button
            onClick={handleHamburger}
            className="lg:hidden flex items-center px-3 py-2 rounded text-gray-800 hover:rounded-full hover:bg-gray-200"
          >
            {hamburger ? (
              <IoCloseCircle className="fill-current h-5 w-5" />
            ) : (
              <GiHamburgerMenu className="fill-current h-5 w-5" />
            )}
          </button>
        </div>

        <div
          className={`w-full lg:flex lg:items-center lg:w-auto ${
            hamburger ? "block" : "hidden"
          }`}
        >
            <div
        className={`flex flex-col lg:hidden mt-4 border border-1 mx-2 lg:mx-0 border-gray-400 rounded-md ${
          hamburger ? "block" : "hidden"
        }`}
      >
        <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden p-2 box-border">
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 pl-2 box-border"
            type="text"
            id="search"
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search something.."
          />
          <button
            type="submit"
            className="grid place-items-center h-full w-12 text-gray-300"
            onClick={navigateSearch}
          >
            <FaSearch />
          </button>
        </div>
        
      </div>
          <div className="text-md font-bold text-gray-600 lg:flex-grow flex flex-wrap items-center lg:flex-row mx-2">
            {[
              "health",
              "entertainment",
              "business",
              "science",
              "sports",
            ].map((category) => (
              <Link
                key={category}
                href={`/category/${category}`}
                className="block mt-4 lg:mt-0 md:inline-block hover:text-gray-700 px-4 py-2 rounded hover:bg-gray-200 mr-2"
                onClick={closeMenu}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </div>

          <div className="relative mx-auto text-gray-600 lg:block hidden">
            <input
              className="border-2 border-gray-300 bg-white h-10 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
              onChange={(e) => setsearch(e.target.value)}
            />
            <button
              onClick={navigateSearch}
              type="submit"
              className="absolute right-0 top-0 mt-3 mr-2"
            >
              <FaSearch />
            </button>
          </div>

          <div className="flex mt-4 lg:mt-0 mx-2 lg:mx-0">
            {status === "authenticated" ? (
              <button
                onClick={LogOut}
                className="block text-md px-4 py-2 rounded bg-blue-700 text-white ml-2 font-bold hover:text-white hover:bg-blue-800"
              >
                LogOut
              </button>
            ) : (
              <Link
                href="/login"
                className="block text-md px-4 py-2 rounded bg-blue-700 text-white ml-2 font-bold hover:text-white hover:bg-blue-800"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
      <style jsx>{`
        @media (width>=1010px) and (width<= 1200px) {
          #imp {
            display: flex;
            flex-direction:column;
          }
        }
       
        }
      `}</style>
    
    </nav>
  );
};

export default Navbar;
