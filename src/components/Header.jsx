"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { IMAGES } from "@/assets";
import { FaCaretDown } from "react-icons/fa6";
import Image from "next/image";
import { useGetQuery } from "@/app/query";
import { useRouter } from "next/navigation";
const Header = () => {
  const pathname = usePathname();
  const [activeLink, setActiveLink] = useState("");
  const [logout, setLogout] = useState(false);
  const [admin, setAdmin] = useState();
  const router = useRouter();
  const [token, settoken] = useState();

  useEffect(() => {
    settoken(localStorage.getItem("tokenmoneyplanner"));
    const storedUser = localStorage.getItem("usermoneyplanner");
    if (storedUser) {
      setAdmin(JSON.parse(storedUser));
    }
  }, []);
  const logoutButton = () => {
    localStorage.removeItem("usermoneyplanner");
    localStorage.removeItem("tokenmoneyplanner");
    router.push("/login");
  };

  // useEffect(() => {
  //     setActiveLink(pathname);
  //     console.log(pathname)
  // }, [pathname]);
  // Define paths where the header should not be displayed
  const hiddenPaths = ["/login", "/register", "/forgotpassword", "/resetpassword"];

  // Check if the current path is in the hiddenPaths array
  const shouldShowHeader = !hiddenPaths.includes(pathname);

  const returnTextOnPath = (path) => {
    switch (path) {
      case "/dashboard":
        return (
          <div>
            <div className="text-lg font-bold">Hello, {admin?.name}!</div>
            <div className="text-sm text-gray-500">
              Welcome back to Admin Panel.
            </div>
          </div>
        );
      case "/premium":
        return (
          <div>
            <div className="text-lg font-bold">Premium Packages</div>
          </div>
        );
      case "/products":
        return (
          <div>
            <div className="text-lg font-bold">Products</div>
            <div className="text-sm text-gray-500">
              Manage all your products here.
            </div>
          </div>
        );
      case "/orders":
        return (
          <div>
            <div className="text-lg font-bold">Orders</div>
            <div className="text-sm text-gray-500">
              Manage all your orders here.
            </div>
          </div>
        );
      case "/earnings":
        return (
          <div>
            <div className="text-lg font-bold">Earnings</div>
            <div className="text-sm text-gray-500">
              Manage all your earnings here.
            </div>
          </div>
        );
      case "/settings":
        return (
          <div>
            <div className="text-lg font-bold">Settings</div>
            <div className="text-sm text-gray-500">
              Manage all your settings here.
            </div>
          </div>
        );
      default:
        return (
          <div>
            <div className="text-lg font-bold">Hello, {admin?.name}</div>
            <div className="text-sm text-gray-500">
              Welcome back to Admin Panel.
            </div>
          </div>
        );
    }
  };

  if (!shouldShowHeader) {
    return null;
  }
  return (
    <>
      {token && (
        <header className="bg-white border-b">
          <div className="flex justify-between items-center h-[3.9rem] px-4">
            <div className="md:flex hidden">{returnTextOnPath(pathname)}</div>
            <div className="flex border-l h-[3.9rem] items-center">
              <div className="px-2">
                <Image
                  src={IMAGES.profile}
                  alt="profile"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="px-2">
                <div className="font-bold text-[16px]">{admin?.name}</div>
                <div className="font-light text-[15px] text-[#777777]">
                  {admin?.role}
                </div>
              </div>
              <div>
                <FaCaretDown
                  onClick={() => {
                    if (!logout) {
                      setLogout(true);
                    } else {
                      setLogout(false);
                    }
                  }}
                  className="cursor-pointer"
                  size={25}
                />
                {logout && (
                  <div className="absolute right-0 top-[3.9rem] mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <button
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={logoutButton}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
