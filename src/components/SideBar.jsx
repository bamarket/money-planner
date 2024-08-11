"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { dashboardLinks } from "@/app/data/dashboardLinks";
import { usePathname } from "next/navigation";
import { IMAGES } from "@/assets";
import { useStateContext } from "../app/context/stateContext"; // Import the context
import Image from "next/image";
import withAuth from "@/app/withauth";

const SideBar = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState();
  const { stateType, setStateType } = useStateContext();
  const [subMembers, setSubMembers] = useState(false);
  // Define paths where the header should not be displayed
  const hiddenPaths = ["/login", "/register"]; // Add paths here

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
        <div className="w-64 h-screen  border-r">
          <div className="text-lg font-bold mb-4 border-b">
            <Link href="/" className="flex justify-center items-center">
              <Image src={IMAGES.logo} alt="logo" width={80} height={100} />
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
      )}
    </>
  );
};

export default SideBar;
