import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import Navbar from "@/components/general/Navbar";
import React from "react";

const CoursesPage = () => {
  return (
    <main className="courses-container">
      <Navbar />
      <section className="courses-section">
        <Header title="Courses" />
        <div className="courses">
          <div className="course">
            <h1>This content is not available yet!</h1>
            <img src="/assets/svgs/construction.svg" alt="not-available" />
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
};

export default CoursesPage;
