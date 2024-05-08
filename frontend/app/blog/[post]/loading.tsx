import Footer from "@/components/general/Footer";
import Navbar from "@/components/general/Navbar";
import React from "react";
import Skeleton from "react-loading-skeleton";

const loading = () => {
  return (
    <main className="post-view">
      <Navbar />
      <section className="post-view-section">
        <h1>
          {" "}
          <Skeleton height="100%" width="300px" />
        </h1>
        <div className="author-timestamp">
          <div className="image">
            <Skeleton height="100%" width="100%" circle={true} />
          </div>
          <div className="details">
            <p>
              {" "}
              <Skeleton height="12px" width="150px" />
            </p>
            <p>
              {" "}
              <Skeleton height="12px" width="80px" />
            </p>
          </div>
        </div>
        <div className="statistics">
          <div className="item">
            <p>
              {" "}
              <Skeleton height="12px" width="80px" />
            </p>
          </div>
        </div>
        <div className="blog-image">
          <Skeleton height="100%" width="100%" />
        </div>
        <div className="post-body">
          <p>
            {" "}
            <Skeleton height="15px" width="90%" />
          </p>
          <p>
            {" "}
            <Skeleton height="15px" width="65%" />
          </p>
          <p>
            {" "}
            <Skeleton height="15px" width="45%" />
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default loading;
