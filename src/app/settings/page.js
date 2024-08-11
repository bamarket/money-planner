"use client";
import React, { useEffect, useState } from "react";
import withAuth from "../withauth";
import { useUpdateMutation } from "../query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
const Page = () => {
  const [userId, setUserId] = useState();
  const [showPopup, setShowPopup] = useState(false);
  const updateMutation = useUpdateMutation();
  const [showNewPassword, setNewShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usermoneyplanner"));
    if (user) {
      setUserId(user);
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, []);

  // State objects to manage form values

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  // Handler for profile form inputs
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handler for password form inputs
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };



  let url = "";
  let queryKey = "";
  const handleSubmitProfile = (e) => {
    e.preventDefault();
    // Handle profile form submission logic here
    url = `user/update-user`;
    queryKey = "admin";
    let id = userId._id;
    updateMutation.mutate({
      data: { id, ...profileForm },
      url,
      queryKey,
    });
    // setShowPopup(true);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();
    // Handle password form submission logic here
    updateMutation.mutate({
      data: { ...userId, ...passwordForm },
      url: "user/change-password",
      queryKey: "admin",
    });
    console.log("Password form submitted:", passwordForm);
  };

  return (
    <div className="p-8">
      <ToastContainer />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Edit Profile Section */}
        <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <form className="space-y-4">
            <div className="mb-6">
              <label className="block text-gray-700">Full Name</label>
              <input
                name="name"
                className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Full Name"
                style={{ backgroundColor: "#5B48BB08" }}
                value={profileForm.name}
                onChange={handleProfileChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Email Address</label>
              <input
                name="email"
                className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email"
                style={{ backgroundColor: "#5B48BB08" }}
                value={profileForm.email}
                onChange={handleProfileChange}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Phone Number</label>
              <input
                name="phone"
                className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="tel"
                placeholder="Phone Number"
                style={{ backgroundColor: "#5B48BB08" }}
                value={profileForm.phone}
                onChange={handleProfileChange}
              />
            </div>
            <button
              className="button-color text-white py-2 px-4 rounded-lg" style={{ backgroundColor: '#803c19' }}
              onClick={handleSubmitProfile}
            >
              Save Profile
            </button>
          </form>
        </div>

        {/* Change Password and Notifications Section */}
        <div className="space-y-8">
          {/* Change Password Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <form className="space-y-4" onSubmit={handleSubmitPassword}>
              <div className="mb-6 relative">
                <label className="block text-gray-700">Current Password</label>
                <input
                  name="currentPassword"
                  className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  style={{ backgroundColor: "#5B48BB08" }}
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                />
                <div className="absolute inset-y-4 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-600 focus:outline-none pt-7"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
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
                <label className="block text-gray-700">New Password</label>
                <input
                  name="newPassword"
                  className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  style={{ backgroundColor: "#5B48BB08" }}
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                />
                <div className="absolute inset-y-4 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-600 focus:outline-none pt-7"
                    onClick={() => {
                      setNewShowPassword(!showNewPassword);
                    }}
                  >
                    {showNewPassword ? (
                      <FaEyeSlash size={22} />
                    ) : (
                      <FaEye size={22} />
                    )}
                  </button>
                </div>
              </div>
              <div className="mb-6 relative">
                <label className="block text-gray-700">Confirm Password</label>
                <input
                  name="confirmPassword"
                  className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  style={{ backgroundColor: "#5B48BB08" }}
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
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
              <button
                type="submit"
                className="button-color text-white py-2 px-4 rounded-lg"
                style={{ backgroundColor: '#803c19' }}
              >
                Change Password
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default withAuth(Page);
