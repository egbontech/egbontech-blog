import { baseUrl, siteUrl } from '@/baseURL'
import Footer from "@/components/general/Footer";
import Navbar from "@/components/general/Navbar";
import SocialShareLinks from "@/components/postview/SocialShareLinks";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";

interface Props {
  params: {
    post: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // const rewrittenPost = params.post.replace(/-/g, " ");
  const Fetch = async (slug: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/postview/${slug}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const data = await Fetch(params.post);

  return {
    metadataBase: new URL(siteUrl),
    title: `${data?.post?.title}`,
    description:`${data?.post?.meta_desc}`,
    openGraph: {
      images: [
        {
          url: `${baseUrl}/${data?.post?.image}`,
        },
      ],
    },
  };
}

const PostView: React.FC<Props> = async ({ params: { post } }) => {
  const Fetch = async (slug: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/postview/${slug}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const data = await Fetch(post);

  const FormatDate = (postDate: string) => {
    const date = new Date(postDate);
    const formattedDate = date.toLocaleDateString("en-NG", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const rewrittenPost = post.replace(/-/g, " ");

  const RenderViews = (views: number) => {
    if (views > 1000) {
      const thousands = (views / 1000).toFixed(1);
      return `${thousands}k`;
    } else {
      return views;
    }
  };

  if (data?.status === 200) {
    return (
      <main className="post-view">
        <Navbar />
        <section className="post-view-section">
          <h1>{data?.post?.title}</h1>
          <div className="author-timestamp">
            <div className="image">
              <img
                src={`${baseUrl}/${data?.post?.author?.image}`}
                alt="author"
              />
            </div>
            <div className="details">
              <p>
                {data?.post?.author?.lastname} {data?.post?.author?.firstname}
              </p>
              <div className="timestamp">
                {data?.post?.read_time > 1 ? (
                  <span>{data?.post?.read_time} mins read</span>
                ) : (
                  <span>1 min read</span>
                )}

                <span>{FormatDate(data?.post?.created_at)}</span>
              </div>
            </div>
          </div>
          <div className="statistics">
            <div className="item">
              <FaEye className="i" />
              <p>{RenderViews(data?.post?.views_count)}</p>
            </div>
          </div>
          <div className="blog-image">
            <img src={`${baseUrl}/${data?.post?.image}`} alt="author" />
          </div>
          <div className="post-body">
            <div dangerouslySetInnerHTML={{ __html: data?.post?.content }} />
          </div>
          {/* <div className="comments-container">
            <h2>comments(2)</h2>
            <div className="comments-list">
              <div className="comment">
                <div className="image">
                  <img src="/assets/images/p.png" alt="profile_picture" />
                </div>
                <div className="details">
                  <div className="username-timestamp">
                    <p>username</p>
                    <p>27th november 2022</p>
                  </div>
                  <p className="comment-body">
                    Nice post i found it really helpful.
                  </p>
                </div>
              </div>
              <div className="comment">
                <div className="image">
                  <img src="/assets/images/p.png" alt="profile_picture" />
                </div>
                <div className="details">
                  <div className="username-timestamp">
                    <p>username</p>
                    <p>27th november 2022</p>
                  </div>
                  <p className="comment-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Qui, autem unde aliquam consequuntur quod non eveniet
                    laudantium distinctio blanditiis praesentium voluptatem a
                    tempore vel minus perspiciatis aliquid! Animi, nostrum
                    error.
                  </p>
                </div>
              </div>
              <div className="comment">
                <div className="image">
                  <img src="/assets/images/p.png" alt="profile_picture" />
                </div>
                <div className="details">
                  <div className="username-timestamp">
                    <p>username</p>
                    <p>27th november 2022</p>
                  </div>
                  <p className="comment-body">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Qui, autem unde aliquam consequuntur quod non eveniet
                    laudantium distinctio blanditiis praesentium voluptatem a
                    tempore vel minus perspiciatis aliquid! Animi, nostrum
                    error.
                  </p>
                </div>
              </div>
            </div>
            <div className="load-more-button">
              <button>Load more</button>
            </div>
            <div className="form-container">
              <h2>Leave a comment</h2>
              <div className="input-container">
                <input type="text" placeholder="Name" />
              </div>

              <div className="input-container">
                <textarea name="" id="" placeholder="Comment..."></textarea>
              </div>
              <div className="button-container">
                <button>Submit</button>
              </div>
            </div>
          </div> */}
          <SocialShareLinks />
        
        </section>
        <Footer />
      </main>
    );
  }
  return (
    <main className="post-view">
      <Navbar />
      <section className="post-view-section">
        <div className="empty-blog">
          <h1 style={{ textAlign: "center" }}>{rewrittenPost}</h1>
          <p>We found nothing!</p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default PostView;
