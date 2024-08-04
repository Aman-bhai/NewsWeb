"use client";

import classNames from "classnames";
import { colorMap } from "@/app/utils/module";
import { useRouter } from "next/navigation";
import { useNews } from "@/app/context/NewsContext";
import Image from "next/image";

const Card = (props) => {
  const { image, desc, title, date, author, url, src_name, color } = props;
  const router = useRouter();
  const { setSelectedNews } = useNews();

  const cardColorClass = colorMap[color] || [
    "bg-violet-500",
    "hover:bg-violet-700",
  ];

  const handleClick = () => {
    setSelectedNews({ title, image, desc, date, author, url, src_name });
    router.push("/newsDetails");
  };

  return (
    <div
      className="relative max-w-sm overflow-hidden shadow-lg bg-white dark:bg-gray-700 md:mx-2 my-2 cursor-pointer bg-opacity-80 dark:bg-opacity-90 backdrop-blur-md border border-gray-200 dark:border-gray-600 rounded-md transition-transform transform hover:scale-105"
      onClick={handleClick}
    >
      <div className="flex justify-end">
        <h4
          className={classNames(
            "w-fit px-4 rounded text-md absolute text-white font-semibold",
            cardColorClass[0]
          )}
        >
          {src_name}
        </h4>
      </div>

      <div className="img flex items-center justify-center">
        <Image
          className="h-64 w-full object-cover"
          src={!image ? "/assets/general_news.webp" : image}
          alt="NewsProfile"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="px-6 py-4 text-slate-900 dark:text-white">
        <div className="font-bold text-lg mb-2">{title}</div>
        <p className="text-slate-900 dark:text-gray-300 text-sm mb-4">
          {desc.length <= 100 ? desc : `${desc.substring(0, 100)}...`}
        </p>

        <button
          className={classNames(
            cardColorClass[0],
            cardColorClass[1],
            "text-white",
            "font-bold",
            "py-1",
            "px-2",
            "rounded"
          )}
          onClick={(e) => {
            e.stopPropagation();
            window.open(url, "_blank");
          }}
        >
          Read More
        </button>
      </div>

      <div className="px-6 pt-4 pb-2 flex space-x-5 justify-between">
        <span className="inline-block py-1 text-xs font-semibold mr-2 mb-2 dark:text-gray-300">
          Published At: {date.substring(0, 10)}
        </span>
        <span className="inline-block py-1 text-xs font-semibold mr-2 mb-2 w-fit dark:text-gray-300">
          {author}
        </span>
      </div>
    </div>
  );
};

export default Card;
