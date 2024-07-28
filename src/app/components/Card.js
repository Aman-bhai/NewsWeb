"use client";

import { useRouter } from "next/navigation";

const Card = (props) => {
  const router=useRouter()
  const { image, desc, title, date, author, url, src_name, color } = props;
  const colorMap = {
    red: "bg-red-500",
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    fuchsia: "bg-fuchsia-500",
    indigo: "bg-indigo-500",
  };

  const cardColorClass = colorMap[color] || "bg-violet-500";

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg md:mx-2 my-2 ">
      <div className="flex justify-end">
        <h4
          className={`w-fit px-4 rounded text-sm absolute text-white font-semibold ${cardColorClass}`}
        >
          {src_name}
        </h4>
      </div>

      <div className="img flex items-center justify-center">
        <img
          className="h-64"
          src={!image ? "/assets/general_news.webp" : image}
          alt="NewsProfile"
        />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">{title}</div>
        <p className="text-gray-700 text-sm mb-4">
          {desc.length <= 100 ? desc : desc.substring(0, 100) + "..."}
        </p>

        {!title ? (
          " "
        ) : (
          <button
            className={`${cardColorClass} hover:bg-transparent  hover:text-black text-white font-bold py-1 px-2 rounded`}
            onClick={() => router.push(url)}
          >
            Read More
          </button>
        )}
      </div>
      <div className="px-6 pt-4 pb-2 flex space-x-5 justify-between">
        <span className="inline-block  py-1 text-xs font-semibold mr-2 mb-2">
          PublishedAt :{date.substring(0, 10)}
        </span>
        <span
          className={`inline-block  py-1 text-xs font-semibold  mr-2 mb-2 w-fit`}
        >
          {author}
        </span>
      </div>
    </div>
  );
};

export default Card;
