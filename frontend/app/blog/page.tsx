"use client";
import { baseUrl } from "@/baseURL";
import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import Navbar from "@/components/general/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { FaEye, FaUserAlt } from "react-icons/fa";
import { useInfiniteQuery } from "react-query";
import axios from "@/axios";
import CardSkeleton from "@/components/skeletons/CardSkeleton";

interface Post {
  id: number;
  title: string;
  slug: string;
  created_at: string;
  image: string;
  meta_description: string;
  views_count: number;
  category: {
    name: string;
  };
  author: {
    lastname: string;
  };
}

interface Category {
  id: number;
  slug: string;
  name: string;
}

const BlogPage = () => {
  const [selectBox, setSelectBox] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState("");

  const updateSelectBox = () => {
    setSelectBox(!selectBox);
  };

  useEffect(() => {
    const Fetch = async () => {
      try {
        await axios
          .get("/categories")
          .then((res: any) => {
            setCategoryList(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
    Fetch();
  }, []);

  const Fetch = async ({ pageParam = 1 }) => {
    const url = new URL(`${baseUrl}/api/all-posts?page=${pageParam}`);
    if (category) {
      url.searchParams.append("category", category);
    }
    const res = await fetch(url);
    return res.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: Fetch,
    getNextPageParam: (Page) => {
      try {
        if (Page.current_page < Page.last_page) {
          return Page.current_page + 1;
        }
        return undefined;
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (category) {
      refetch();
    }
  }, [category, refetch]);

  const FormatDate = (postDate: string) => {
    const date = new Date(postDate);
    const formattedDate = date.toLocaleDateString("en-NG", {
      month: "short",
      day: "2-digit",
      year: "numeric",
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

  if (status === "loading") {
    return (
      <main className="blog-page-container">
        <Navbar />
        <section className="posts-section">
          <Header title="Egbontech Blog" />
          <div className="select-category-container">
            <div className="select-box" onClick={updateSelectBox}>
              {category ? (
                <span>{category}</span>
              ) : (
                <span>--Explore By Category--</span>
              )}
            </div>
            {selectBox && (
              <div className="select-options">
                {categoryList?.map((category: Category) => {
                  return (
                    <p
                      key={category?.id}
                      onClick={() => {
                        setCategory(category?.slug);
                        setSelectBox(false);
                      }}
                    >
                      {category?.name}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div className="posts">
            <CardSkeleton number={3} />
          </div>
        </section>
        <Footer />
      </main>
    );
  }
  if (status === "error") {
    return (
      <main className="blog-page-container">
        <Navbar />
        <section className="posts-section">
          <Header title="Egbontech Blog" />
          <div className="select-category-container">
            <div className="select-box" onClick={updateSelectBox}>
              {category ? (
                <span>{category}</span>
              ) : (
                <span>--Explore By Category--</span>
              )}
            </div>
            {selectBox && (
              <div className="select-options">
                {categoryList?.map((category: Category) => {
                  return (
                    <p
                      key={category?.id}
                      onClick={() => {
                        setCategory(category?.slug);
                        setSelectBox(false);
                      }}
                    >
                      {category?.name}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div className="posts">
            <CardSkeleton number={3} />
          </div>
        </section>
        <Footer />
      </main>
    );
  }
  if (data?.pages[0]?.total > 0) {
    return (
      <main className="blog-page-container">
        <Navbar />
        <section className="posts-section">
          <Header title="Egbontech Blog" />
          <div className="select-category-container">
            <div className="select-box" onClick={updateSelectBox}>
              {category ? (
                <span>{category}</span>
              ) : (
                <span>--Explore By Category--</span>
              )}
            </div>
            {selectBox && (
              <div className="select-options">
                {categoryList?.map((category: Category) => {
                  return (
                    <p
                      key={category?.id}
                      onClick={() => {
                        setCategory(category?.slug);
                        setSelectBox(false);
                      }}
                    >
                      {category?.name}
                    </p>
                  );
                })}
              </div>
            )}
          </div>
          <div className="posts">
            {data?.pages?.map((page) =>
              page?.data?.map((post: Post) => {
                return (
                  <div className="card" key={post?.id}>
                    <Link href={`blog/${post?.slug}`}>
                      <div className="image">
                        <img
                          src={`${baseUrl}/${post?.image}`}
                          alt="blog-image"
                        />
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
              })
            )}
          </div>
          {hasNextPage && !isFetchingNextPage && (
            <div className="load-more-button">
              <button onClick={() => fetchNextPage()}>Load more</button>
            </div>
          )}
          {isFetchingNextPage && (
            <div className="posts">
              <CardSkeleton number={3} />
            </div>
          )}
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="blog-page-container">
      <Navbar />
      <section className="posts-section">
        <Header title="Blog" />
        <div className="select-category-container">
          <div className="select-box" onClick={updateSelectBox}>
            {category ? (
              <span>{category}</span>
            ) : (
              <span>--Explore By Category--</span>
            )}
          </div>
          {selectBox && (
            <div className="select-options">
              {categoryList?.map((category: Category) => {
                return (
                  <p
                    key={category?.id}
                    onClick={() => {
                      setCategory(category?.slug);
                      setSelectBox(false);
                    }}
                  >
                    {category?.name}
                  </p>
                );
              })}
            </div>
          )}
        </div>

        <div className="empty-blog">
          <p>We found nothing!</p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default BlogPage;
