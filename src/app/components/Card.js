"use client";

import classNames from "classnames";
import { colorMap } from "@/app/utils/module";
import { useRouter } from "next/navigation";
import { useNews } from '@/app/context/NewsContext';

const Card = (props) => {
  const { image, desc, title, date, author, url, src_name,content, color } = props;
  const router = useRouter();
  const { setSelectedNews } = useNews();

  const cardColorClass = colorMap[color] || [
    "bg-violet-500",
    "hover:bg-violet-700",
  ];

  const handleClick = () => {
    setSelectedNews({ title, image, desc, date, author, url, src_name,content });
    router.push('/newsDetails');
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg md:mx-2 my-2 cursor-pointer"
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
        <img
          className="h-64"
          src={!image ? "/assets/general_news.webp" : image}
          alt="NewsProfile"
        />
      </div>

      <div className="px-6 py-4">
        <div className="font-bold text-lg mb-2">{title}</div>
        <p className="text-gray-700 text-sm mb-4">
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
            window.open(url, '_blank');
          }}
        >
          Read More
        </button>
      </div>
      <div className="px-6 pt-4 pb-2 flex space-x-5 justify-between">
        <span className="inline-block py-1 text-xs font-semibold mr-2 mb-2">
          PublishedAt: {date.substring(0, 10)}
        </span>
        <span className="inline-block py-1 text-xs font-semibold mr-2 mb-2 w-fit">
          {author}
        </span>
      </div>
    </div>
  );
};

export default Card;
