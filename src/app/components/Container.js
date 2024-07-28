"use client";
import Card from "./Card";
import Spinner from "./Spinner";
import React, { useEffect, useState } from "react";
import {link} from "@/app/utils/module";
import { usePathname } from "next/navigation";

const Container = (props) => {
  let { category, url, API, color, pageSize = 6 } = props;

  const path = usePathname();

  if (path.split("/")[1] == "category" || path.split("/")[1]=="") {
    url = link.url1;
    console.log(url)
  } else {
    url = link.url2;
    console.log(url)
  }

  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const fetchedNews = async () => {
    const link = `${url}${category}&apiKey=${API} &page=${page}&pageSize=${pageSize}`;
    console.log("link",link)
    console.log("link", link);
    setloading(false);
    let res = await fetch(link);
    res = await res.json();
    setarticles(res.articles);
    console.log(res.articles);
    settotalResults(res.totalResults);
    setloading(true);
  };

  const prevBtn = async () => {
    setPage(page - 1);
    fetchedNews();
  };

  const nextBtn = async () => {
    setPage(page + 1);
    fetchedNews();
  };

  useEffect(() => {
    fetchedNews();
  }, [page, category]);

  return (
    <>
      <h2 className={`font-semibold text-3xl text-center mb-10 pt-10 bg-gee`}>
        NewsDaily - Top News Headlines
      </h2>
      {!loading && <Spinner />}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8  md:gap-y-8 justify-center flex-wrap px-4 py-6 md:px-12  gap-y-16 mt-10">
        {loading &&
          articles.map((item, index) => (
            <Card
              image={item.urlToImage}
              desc={item.description ? item.description : ""}
              title={item.title ? item.title : ""}
              date={item.publishedAt ? item.publishedAt : ""}
              author={item.author ? item.author : ""}
              key={index}
              url={item.url ? item.url : "/"}
              src_name={item.source_name ? item.source_name : ""}
              color={color}
            />
          ))}
      </div>
      <div className="flex justify-between w-fit mx-auto my-10">
        <button
          disabled={page <= 1}
          type="button"
          className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-1 px-2 rounded mr-10"
          onClick={prevBtn}
        >
          &larr; Previous
        </button>
        <button
          disabled={page + 1 > Math.ceil(totalResults / pageSize)}
          type="button"
          className="bg-blue-500 hover:bg-blue-700  text-white font-bold py-1 px-2 rounded"
          onClick={nextBtn}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
};

export default Container;
