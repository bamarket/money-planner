"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { IMAGES } from "@/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateMutation } from "../query";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function ResetPasswordPage() {
  const router = useRouter();

  // Suspense boundary for useSearchParams
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("tokenmoneyplanner");

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const createMutation = useCreateMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const data = { newPassword: formData.newPassword, token };
    let url = "";
    let queryKey = "";
    url = "user/reset-password";
    queryKey = "user";
    createMutation.mutate({ data, url, queryKey });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <Image
              src={IMAGES.logo}
              alt="SoulWatch Logo"
              className="mx-auto h-23 w-auto"
            />
            <h2 className="mt-6 pb-5 text-center text-3xl font-extrabold text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your new password below.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex-grow flex flex-col justify-center"
          >
            <div className="mb-6 relative">
              <label className="text-base text-gray-500">New Password</label>
              <input
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full mt-3 py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                style={{ backgroundColor: "#5B48BB08" }}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  className="text-gray-600 focus:outline-none pt-7"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEyeSlash size={22} />
                  ) : (
                    <FaEye size={22} />
                  )}
                </button>
              </div>
            </div>
            <div className="mb-6 relative">
              <label className="text-base text-gray-500">
                Confirm New Password
              </label>
              <input
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                className="appearance-none border rounded-lg w-full mt-3 py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                style={{ backgroundColor: "#5B48BB08" }}
              />
              <div className="absolute inset-y-4 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  className="text-gray-600 focus:outline-none pt-7"
                  onClick={() => {
                    setConfirmShowPassword(!showConfirmPassword);
                  }}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash size={22} />
                  ) : (
                    <FaEye size={22} />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="button-color text-white flex items-center justify-center py-3 px-4 rounded-lg w-full"
              >
                Reset Password
              </button>
            </div>
            <div className="text-center mt-4">
              <a
                href="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>
      <div
        className="hidden md:flex w-1/2 items-center justify-center"
        style={{ backgroundColor: "#E63C920A" }}
      >
        <Image
          src={IMAGES.signInImage}
          alt="Wedding Illustration"
          className="max-w-md"
        />
      </div>
    </div>
  );
}
