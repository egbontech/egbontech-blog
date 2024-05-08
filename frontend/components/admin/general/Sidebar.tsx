"use client";
import React, { useMemo, useContext, useState, useEffect } from "react";
import Link from "next/link";
import { AiFillDashboard } from "react-icons/ai";
import { FaBlog, FaPowerOff } from "react-icons/fa";
import { TbCategoryFilled } from "react-icons/tb";
import { BsFillBriefcaseFill } from "react-icons/bs";
import Cookies from "universal-cookie";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { FaMessage } from "react-icons/fa6";
import { NavbarContext } from "@/Providers/NavbarProvider";

const Sidebar = () => {
  const currentPage = usePathname();
  const cookies = useMemo(() => new Cookies(), []);
  const context = useContext(NavbarContext);
  const router = useRouter();
  const [Loading, setLoading] = useState(true);

  const navbarOpen = context?.navbarOpen;
  const [Admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    try {
      const token = cookies.get("token");
      if (token) {
        setAdmin(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [cookies]);

  const Logout = () => {
    cookies.remove("token", { path: "/" });
    setAdmin(false);
    router.push("/emmy/login");
  };

  if (Loading) return;
  return (
    <div className={`sidebar ${navbarOpen && "sidebar-open"}`}>
      <p style={{ textAlign: "center" }}></p>
      <ul>
        <li
          className={`${
            currentPage === "/emmy/dashboard" ? "active-sidebar" : ""
          }`}
        >
          <Link href="/emmy/dashboard">
            <AiFillDashboard className="i" />
            <span>Dashboard</span>
          </Link>
        </li>
        {/* <li>
          <Link href="#">
            <RiAdminFill className="i" />
            <span>Admins</span>
          </Link>
        </li> */}
        {/* <li>
          <Link href="#">
            <FaUserEdit className="i" />
            <span>Authors</span>
          </Link>
        </li> */}
        <li
          className={`${
            currentPage === "/emmy/categories/manage-categories" ||
            currentPage === "/emmy/categories/add-category"
              ? "active-sidebar"
              : ""
          }`}
        >
          <Link href="/emmy/categories/manage-categories">
            <TbCategoryFilled className="i" />
            <span>Categories</span>
          </Link>
        </li>
        <li
          className={`${
            currentPage === "/emmy/posts/manage-posts" ||
            currentPage === "/emmy/posts/add-post"
              ? "active-sidebar"
              : ""
          }`}
        >
          <Link href="/emmy/posts/manage-posts">
            <FaBlog className="i" />
            <span>Posts</span>
          </Link>
        </li>
        <li
          className={`${
            currentPage === "/emmy/projects/manage-projects" ||
            currentPage === "/emmy/projects/add-project"
              ? "active-sidebar"
              : ""
          }`}
        >
          <Link href="/emmy/projects/manage-projects">
            <BsFillBriefcaseFill className="i" />
            <span>Projects</span>
          </Link>
        </li>
        <li
          className={`${
            currentPage === "/emmy/messages" 
              ? "active-sidebar"
              : ""
          }`}
        >
          <Link href="/emmy/messages">
            <FaMessage className="i" />
            <span>Messages</span>
          </Link>
        </li>
        {Admin && (
          <li
            className="logout-btn"
            onClick={Logout}
            style={{ cursor: "pointer" }}
          >
            <FaPowerOff className="i" />
            <span>Logout</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
