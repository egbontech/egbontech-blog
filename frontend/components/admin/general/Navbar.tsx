import { NavbarContext } from "@/Providers/NavbarProvider";
import Link from "next/link";
import React, { useContext } from "react";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const context = useContext(NavbarContext);

  const toggleNav = context?.setNavbarOpen;
  const navbarOpen = context?.navbarOpen;

  const toggleNavbar = () => {
    if (toggleNav) {
      toggleNav(!navbarOpen);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-items">
        <ul className="main-nav">
          <li>
            <Link href="#" className="nav-links">
           <h2>Logo</h2>
            </Link>
          </li>
        </ul>
        <IoMenu className="menu-button" onClick={toggleNavbar} />
      </div>
    </nav>
  );
};

export default Navbar;
