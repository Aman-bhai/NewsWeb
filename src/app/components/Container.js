// "use client";
// import Card from "./Card";
// import Spinner from "./Spinner";
// import React, { useEffect, useState } from "react";
// import {link,colorMap} from "@/app/utils/module";
// import { usePathname } from "next/navigation";
// import classNames from "classnames";
// import { useRouter } from "next/navigation";

// const Container = (props) => {
//   let { category, url, API, color, pageSize = 6 } = props;

//   const path = usePathname();
//   const Router=useRouter()

//   if (path.split("/")[1] == "category" || path.split("/")[1]=="") {
//     url = link.url1;
//     console.log(url)
//   } else {
//     url = link.url2;
//     console.log(url)
//   }

//   const [articles, setarticles] = useState([]);
//   const [loading, setloading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [totalResults, settotalResults] = useState(0);

//   const fetchedNews = async () => {
//     const link = `${url}${category}&apiKey=${API} &page=${page}&pageSize=${pageSize}`;
//     console.log("link",link)
//     console.log("link", link);
//     setloading(false);
//     let res = await fetch(link);
//     res = await res.json();
//     setarticles(res.articles);
//     console.log(res.articles);
//     settotalResults(res.totalResults);
//     setloading(true);
//   };

//   const prevBtn = async () => {
//     setPage(page - 1);
//     fetchedNews();
//   };

//   const nextBtn = async () => {
//     setPage(page + 1);
//     fetchedNews();
//   };

//   useEffect(() => {
//     fetchedNews();
//   }, [page, category]);



//   const cardColorClass = colorMap[color] || [
//     "bg-violet-500",
//     "hover:bg-violet-700",
//   ];


//   return (
//     <>
//       <h2 className={`font-semibold text-3xl text-center mb-10 pt-10 bg-gee`}>
//         NewsDaily - Top News Headlines
//       </h2>
//       {!loading && <Spinner />}

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8  md:gap-y-8 justify-center flex-wrap px-4 py-6 md:px-12  gap-y-16 mt-10">
//         {loading &&
//           articles.map((item, index) => (
//             <Card
//               image={item.urlToImage}
//               desc={item.description ? item.description : ""}
//               title={item.title ? item.title : ""}
//               date={item.publishedAt ? item.publishedAt : ""}
//               author={item.author ? item.author : ""}
//               key={index}
//               url={item.url ? item.url : "/"}
//               src_name={item.source.name ? item.source.name : ""}
//               color={color}
//               onClick={Router.push("/newsDetails")}
//             />
//           ))}
//       </div>
//       {loading && (<div className="flex justify-between w-fit mx-auto my-10">
//         <button
//           disabled={page <= 1}
//           type="button"
//           className={classNames(
//             cardColorClass[0],
//             cardColorClass[1],
//             "text-white",
//             "font-bold",
//             "py-1",
//             "px-2",
//             "rounded",
//             "mr-4"
//           )}
//           onClick={prevBtn}
//         >
//           &larr; Previous
//         </button>
//         <button
//           disabled={page + 1 > Math.ceil(totalResults / pageSize)}
//           type="button"
//           className={classNames(
//             cardColorClass[0],
//             cardColorClass[1],
//             "text-white",
//             "font-bold",
//             "py-1",
//             "px-2",
//             "rounded"
//           )}
//           onClick={nextBtn}
//         >
//           Next &rarr;
//         </button>
//       </div>)}
      
//     </>
//   );
// };

// export default Container;



"use client";
import Card from "./Card";
import Spinner from "./Spinner";
import React, { useEffect, useState } from "react";
import { link, colorMap } from "@/app/utils/module";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import { useRouter } from "next/navigation";

const Container = (props) => {
  const { category, API, color, pageSize = 6 } = props;
  const path = usePathname();
  const router = useRouter();
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Determine the URL based on path
  const url = path.split("/")[1] === "category" || path.split("/")[1] === ""
    ? link.url1
    : link.url2;

  const fetchedNews = async () => {
    setLoading(true); // Start loading
    const fetchUrl = `${url}${category}&apiKey=${API}&page=${page}&pageSize=${pageSize}`;
    try {
      const res = await fetch(fetchUrl);
      const data = await res.json();
      setArticles(data.articles);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error("Failed to fetch news", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  const prevBtn = async () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextBtn = async () => {
    if (page < Math.ceil(totalResults / pageSize)) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchedNews();
  }, [page, category]);

  const cardColorClass = colorMap[color] || ["bg-violet-500", "hover:bg-violet-700"];

  // Handle click on a card
  const handleCardClick = (url) => {
    router.push(`/newsDetails?url=${encodeURIComponent(url)}`);
  };

  return (
    <>
      <h2 className="font-semibold text-3xl text-center mb-10 pt-10 bg-gee">
        NewsDaily - Top News Headlines
      </h2>
      {loading && <Spinner />}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-y-8 justify-center flex-wrap px-4 py-6 md:px-12 gap-y-16 mt-10">
        {!loading &&
          articles.map((item) => (
            <Card
              key={item.url} // Use unique identifier
              image={item.urlToImage}
              desc={item.description ? item.description : ""}
              title={item.title ? item.title : ""}
              date={item.publishedAt ? item.publishedAt : ""}
              author={item.author ? item.author : ""}
              url={item.url ? item.url : "/"}
              src_name={item.source.name ? item.source.name : ""}
              content={item.content? item.content : ""}
              color={color}
              onClick={() => handleCardClick(item.url)} // Handle click
            />
          ))}
      </div>
      {!loading && (
        <div className="flex justify-between w-fit mx-auto my-10">
          <button
            disabled={page <= 1}
            type="button"
            className={classNames(
              cardColorClass[0],
              cardColorClass[1],
              "text-white",
              "font-bold",
              "py-1",
              "px-2",
              "rounded",
              "mr-4"
            )}
            onClick={prevBtn}
          >
            &larr; Previous
          </button>
          <button
            disabled={page >= Math.ceil(totalResults / pageSize)}
            type="button"
            className={classNames(
              cardColorClass[0],
              cardColorClass[1],
              "text-white",
              "font-bold",
              "py-1",
              "px-2",
              "rounded"
            )}
            onClick={nextBtn}
          >
            Next &rarr;
          </button>
        </div>
      )}
    </>
  );
};

export default Container;
