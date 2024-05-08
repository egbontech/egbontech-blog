import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import Navbar from "@/components/general/Navbar";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";

const AboutPage = () => {
  return (
    <main className="about-page-container">
      <Navbar />
      <section className="about-me-section">
        <Header title="About me" />
        <div className="about-me">
          <div className="image">
            <img src="/assets/images/me.jpg" alt="me" />
          </div>
          <div className="details">
            <h2>EgbonTech</h2>
            <p>
              I am a highly experienced full-stack software and web developer
              with over four years of expertise. My skills encompass frontend
              web development, backend web development, and mobile app
              development. I am dedicated to staying current with industry
              trends to deliver innovative solutions to clients and users.
              Additionally, I am a graduate in Chemical Engineering from the
              University of Benin.
            </p>
            <p>
              I am a driven individual with strengths in teamwork,
              communication, and problem-solving. Committed to continuous
              learning and personal growth, I draw inspiration from my
              surroundings and strive for improvement in all aspects of life.
            </p>
            <div className="social-icons">
              <Link href="https://facebook.com/egbontech/" target="_blank">
                <FaSquareFacebook className="i" />
              </Link>
              <Link href="https://twitter.com/egbontech" target="_blank">
                <FaSquareXTwitter className="i" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/eloghosa-egbon-8a3991239/"
                target="_blank"
              >
                <FaLinkedin className="i" />
              </Link>
              <Link href="https://github.com/egbontech" target="_blank">
                <FaGithub className="i" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="tech-stacks-section">
        <Header title="Tech Stack" />
        <div className="tech-stacks">
          <div className="stack">
            <div className="image">
              <img src="/assets/images/html.png" alt="html" />
            </div>
            <p>HTML 5</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/css.png" alt="css" />
            </div>
            <p>CSS 3</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/tailwind.png" alt="css" />
            </div>
            <p>Tailwind</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/javascript.png" alt="javascript" />
            </div>
            <p>JavaScript</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/typescript.png" alt="tavascript" />
            </div>
            <p>TypeScript</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/php.png" alt="php" />
            </div>
            <p>PHP</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/react.png" alt="react" />
            </div>
            <p>React</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/react-native.png" alt="react-native" />
            </div>
            <p>React Native</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/nextjs.png" alt="nextjs" />
            </div>
            <p>Next js</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/laravel.png" alt="laravel" />
            </div>
            <p>Laravel</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/mysql.png" alt="mysql" />
            </div>
            <p>MySql Database</p>
          </div>
          <div className="stack">
            <div className="image">
              <img src="/assets/images/git.png" alt="git" />
            </div>
            <p>Git</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default AboutPage;
