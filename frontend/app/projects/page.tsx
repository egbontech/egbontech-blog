"use client";
import { baseUrl } from "@/baseURL";
import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import Navbar from "@/components/general/Navbar";
import ProjectSkeleton from "@/components/skeletons/ProjectSkeleton";
import Link from "next/link";
import React from "react";
import { FaEye, FaGithub } from "react-icons/fa";
import { useInfiniteQuery } from "react-query";

interface Project {
  id: number;
  title: string;
  image: string;
  status: string;
  desc: string;
  link: string;
  repo: string;
  completed: string;
}

function ProjectsPage() {
  const Fetch = async ({ pageParam = 1 }) => {
    const res = await fetch(`${baseUrl}/api/projects?page=${pageParam}`);
    return res.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["projects"],
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

  if (status === "loading") {
    return (
      <main className="projects-container">
        <Navbar />
        <section className="projects-section">
          <Header title="projects" />
          <div className="projects">
            <ProjectSkeleton number={3} />
          </div>
        </section>
        <Footer />
      </main>
    );
  }
  if (status === "error") {
    return (
      <main className="projects-container">
        <Navbar />
        <section className="projects-section">
          <Header title="projects" />
          <div className="projects">
            <ProjectSkeleton number={3} />
          </div>
        </section>
        <Footer />
      </main>
    );
  }
  if (data?.pages[0]?.total > 0) {
    return (
      <main className="projects-container">
        <Navbar />
        <section className="projects-section">
          <Header title="projects" />
          <div className="projects">
            {data?.pages?.map((page) =>
              page?.data?.map((project: Project) => {
                return (
                  <div className="card" key={project?.id}>
                    <div className="image">
                      <img src={`${baseUrl}/${project?.image}`} alt="" />
                    </div>
                    <div className="details">
                      <p className="title"> {project?.title}</p>
                      <p className="body">{project?.desc}</p>
                      {project?.completed === "yes" ? (
                        <>
                          {project?.link && (
                            <div className="action-buttons">
                              <Link href={project?.link} target="_blank">
                                <FaEye className="i" />
                                <p>View</p>
                              </Link>
                              {project?.status === "private" ? (
                                <Link
                                  href="#"
                                  className="private-repo"
                                  onClick={() =>
                                    alert(
                                      "This project has a private repository!"
                                    )
                                  }
                                >
                                  <FaGithub className="i" />
                                  <p>Repo</p>
                                </Link>
                              ) : (
                                <>
                                  {project?.repo && (
                                    <Link href={project?.repo} target="_blank">
                                      <FaGithub className="i" />
                                      <p>Repo</p>
                                    </Link>
                                  )}
                                </>
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <div
                          className="action-buttons"
                          style={{ gridTemplateColumns: "1fr" }}
                        >
                          <Link href={project?.repo} target="_blank">
                            <FaGithub className="i" />
                            <p>View Repository</p>
                          </Link>
                        </div>
                      )}
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
            <div className="projects">
              <ProjectSkeleton number={3} />
            </div>
          )}
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="projects-container">
      <Navbar />
      <section className="projects-section">
        <Header title="projects" />

        <div className="empty-blog">
          <h1 style={{ textAlign: "center", marginTop: "20px" }}>
            We found nothing!
          </h1>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default ProjectsPage;
