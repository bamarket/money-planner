"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const [token, settoken] = useState();

  useEffect(() => {
    settoken(localStorage.getItem("tokenmoneyplanner"));
  }, []);

  const router = useRouter();
  return (
    <>
        <div className="w-full flex justify-center items-center flex-col h-screen">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="text-2xl">Page Not Found</p>
          <button
            className="mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button-color"
            onClick={() => router.push("/dashboard")}
          >
            Go Back Home
          </button>
        </div>
    </>
  );
};

export default NotFound;
