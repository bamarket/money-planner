"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { dashboardLinks } from "@/app/data/dashboardLinks";
import { usePathname } from "next/navigation";
import { IMAGES } from "@/assets";
import { useStateContext } from "../app/context/stateContext"; // Import the context
import Image from "next/image";
import withAuth from "@/app/withauth";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const SideBar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState();
  const { stateType, setStateType } = useStateContext();
  const [subMembers, setSubMembers] = useState(false);
  // Define paths where the header should not be displayed
  const hiddenPaths = ["/login", "/register"]; // Add paths here
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if the current path is in the hiddenPaths array
  const shouldShowHeader = !hiddenPaths.includes(pathname);
  const [token, settoken] = useState();

  useEffect(() => {
    settoken(localStorage.getItem("tokenmoneyplanner"));
    setActiveLink(pathname);
  }, [pathname]);

  if (!shouldShowHeader) {
    return null;
  }

  const typeOfMember = async (value) => {
    setStateType(value);
  };

  const handleLinkClick = (link) => {
    setStateType(""); 
    setActiveLink(link.href); 
    if(link.title === "Members"){
      setSubMembers(true);
      }
      else{
      setSubMembers(false);
    }
  };


  return (
    <>
      {token && (
        <>
          <div className="lg:hidden flex justify-between items-center p-4 bg-white border-b">
            <Link href="/" className="flex items-center">
              <Image
                src={IMAGES.logo}
                alt="logo"
                width={120}
                height={80}
                className="hidden md:block"
              />
            </Link>
            <FaBars
              className="text-2xl cursor-pointer"
              onClick={() => setIsSidebarOpen(true)}
            />
          </div>
          <div
            className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 lg:translate-x-0 lg:relative lg:shadow-none`}
          >
            <div className="lg:hidden flex justify-between items-center p-4 border-b">
              {/* <Image src={IMAGES.logo} alt="logo" width={120} height={80} /> */}
              <FaTimes
                className="text-2xl cursor-pointer"
                onClick={() => setIsSidebarOpen(false)}
              />
            </div>
            <div className="lg:block text-lg font-bold mb-4 border-b">
              <Link href="/" className="flex justify-center items-center">
                <Image src={IMAGES.logo} alt="logo" width={150} height={100} />
              </Link>
            </div>
            <ul className="p-4">
            {dashboardLinks.map((link) => {
              return (
                <>
                  <li
                    key={link.title}
                    className={`mb-2 rounded-md ${
                      activeLink === link.href ? "button-color" : ""
                    }`}
                  >
                    <Link href={link.href} onClick={() => handleLinkClick(link)}>
                      <div className="flex items-center p-2 rounded cursor-pointer transition-all duration-300 ease-in-out transform">
                        {activeLink === link.href
                          ? link.lightIcon
                          : link.darkIcon}
                        <span
                          className={`ml-2 ${
                            activeLink === link.href ? "text-white" : ""
                          }`}
                        >
                          {link.title}
                        </span>
                      </div>
                    </Link>
                  </li>
                  {link.types && link.types.length > 0 && subMembers && (
                    <ul className="ml-4 mt-2 p-3">
                      {link.types.map((element, index) => (
                        <>
                          <li
                            key={index}
                            className="list-disc cursor-pointer"
                            onClick={() => typeOfMember(element?.value)}
                          >
                            {element?.type}
                          </li>
                        </>
                      ))}
                    </ul>
                  )}
                </>
              );
            })}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default SideBar;
