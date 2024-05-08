import Link from "next/link";
import React from "react";
import Header from "../general/Header";
import { FaEye, FaUserAlt } from "react-icons/fa";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { baseUrl } from "@/baseURL";

interface Post {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  image: string;
  views_count: number;
  category: {
    name: string;
  };
  author: {
    lastname: string;
  };
}

const LatestPosts = async () => {
  const Fetch = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/latest-posts`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const data = await Fetch();

  const FormatDate = (postDate: string) => {
    const date = new Date(postDate);
    const formattedDate = date.toLocaleDateString("en-NG", {
      month: "short", // Short month name (e.g., "Nov")
      day: "2-digit", // Two-digit day of the month (e.g., "24")
      year: "numeric", // Full year (e.g., "2024")
    });
    return formattedDate;
  };

  const RenderViews = (views: number) => {
    if (views > 1000) {
      const thousands = (views / 1000).toFixed(1);
      return `${thousands}k`;
    } else {
      return views;
    }
  };

  return (
    <section className="posts-section">
      <Header title="Latest Posts" />
      <div className="posts">
        {data?.map((post: Post) => {
          return (
            <div className="card" key={post?.id}>
              <Link href={`blog/${post?.slug}`}>
                <div className="image">
                  <img src={`${baseUrl}/${post?.image}`} alt="blog-image" />
                </div>
              </Link>
              <div style={{ margin: "10px 8px" }}>
                <div className="category">{post?.category?.name}</div>
              </div>
              <Link href={`blog/${post?.slug}`}>
                <div className="title">
                  <p>{post?.title}</p>
                </div>
              </Link>
              <div className="author-date">
                <div className="item">
                  <FaUserAlt className="i" />
                  <p>{post?.author?.lastname}</p>
                </div>
                <div className="item">
                  <BsFillCalendar2DateFill className="i" />
                  <p>{FormatDate(post?.created_at)}</p>
                </div>
              </div>
              <div className="statistics">
                <div className="item">
                  <FaEye className="i" />
                  <p>{RenderViews(post?.views_count)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LatestPosts;
