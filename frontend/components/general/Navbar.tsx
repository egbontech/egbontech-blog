"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  const currentPage = usePathname();

  const openMenu = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <>
      <Link href="whatsapp">
        {" "}
        <div className="whatsapp-link">
          <FaWhatsapp className="i" />
        </div>
      </Link>
      <nav className="navbar-container">
        <div className="navbar">
          <Link href="/"className="logo-link">
          <img
            src="/assets/images/logo.png"       
            alt="logo"
            style={{ objectFit: "contain" }}
          />
          </Link>
          <div className="links">
            <ul>
              <li>
                <Link
                  href="/"
                  className={`${
                    currentPage === "/" ? "active-navbar-link" : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`${
                    currentPage === "/about" ? "active-navbar-link" : ""
                  }`}
                >
                  About me
                </Link>
                <Link
                  href="/projects"
                  className={`${
                    currentPage === "/projects" ? "active-navbar-link" : ""
                  }`}
                >
                  Projects
                </Link>
                <Link
                  href="/services"
                  className={`${
                    currentPage === "/services" ? "active-navbar-link" : ""
                  }`}
                >
                  Services
                </Link>
                <Link
                  href="/courses"
                  className={`${
                    currentPage === "/courses" ? "active-navbar-link" : ""
                  }`}
                >
                  Courses
                </Link>
                <Link
                  href="/contact"
                  className={`${
                    currentPage === "/contact" ? "active-navbar-link" : ""
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="blog-link">
            <Link href="/blog">Blog</Link>
          </div>
          <div className="hamburger-container">
            <div
              className={`hamburger ${navbarOpen ? "burgerOpen" : ""}`}
              onClick={openMenu}
            >
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`mobile-navigation ${
          navbarOpen ? "active-mobile-menu" : ""
        }`}
      >
        <div className="links">
          <ul>
            <li>
              <Link
                href="/"
                className={`${
                  currentPage === "/" ? "active-mobile-navbar-link" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`${
                  currentPage === "/about" ? "active-mobile-navbar-link" : ""
                }`}
              >
                About me
              </Link>
              <Link
                href="/projects"
                className={`${
                  currentPage === "/projects" ? "active-mobile-navbar-link" : ""
                }`}
              >
                Projects
              </Link>
              <Link
                href="/services"
                className={`${
                  currentPage === "/services" ? "active-mobile-navbar-link" : ""
                }`}
              >
                Services
              </Link>
              <Link
                href="/courses"
                className={`${
                  currentPage === "/courses" ? "active-mobile-navbar-link" : ""
                }`}
              >
                Courses
              </Link>
              <Link
                href="/contact"
                className={`${
                  currentPage === "/contact" ? "active-mobile-navbar-link" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="blog-link">
            <Link href="/blog">Blog</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;