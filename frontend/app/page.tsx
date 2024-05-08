import Footer from "@/components/general/Footer";
import Navbar from "@/components/general/Navbar";
import DownloadCVButton from "@/components/homepage/DownloadCVButton";
import LatestPosts from "@/components/homepage/LatestPosts";
import TypeWriter from "@/components/homepage/TypeWriter";
import CardSkeleton from "@/components/skeletons/CardSkeleton";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="home-page-container">
        <section className="landing-page">
          <div className="texts-image">
            <div className="texts">
              <p>
                <span style={{ color: "#a78976" }}>Hi!</span> I&apos;m{" "}
              </p>
              <p>Egbon Eloghosa</p>
              <p>
                <TypeWriter />
              </p>
              <div className="links">
                <DownloadCVButton />
                <Link href="/about">About me</Link>
              </div>
            </div>
            <div className="image">
              <img src="/assets/images/me2.jpg" alt="logo" />
            </div>
          </div>
        </section>
      </div>
      <Suspense
        fallback={
          <section className="posts-section">
            <div className="posts">
              <CardSkeleton number={3} />
            </div>
          </section>
        }
      >
        <LatestPosts />
      </Suspense>

      <Footer />
    </main>
  );
}
