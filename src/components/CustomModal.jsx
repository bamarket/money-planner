import React, { useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateMutation, useUpdateMutation } from "@/app/query";

const CustomModal = ({ title, visible, onCancel, initialData, mode, form }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    convertingCurrency: "",
    originalCurrency: "USD",
    price: "",
  });




  const createMutation = useCreateMutation();
  const updateMutation = useUpdateMutation();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        email: initialData.email || "",
        phone: initialData.phone || "",
        name: initialData.name || "",
        password: "",
        role: initialData.role || "",
        originalCurrency: initialData.originalCurrency || "",
        convertingCurrency: initialData.convertingCurrency || "",
        price: initialData.price || "",
      });
    } else if (mode === "create") {
      setFormData({
        email: "",
        name: "",
        phone: "",
        password: "",
        role: "",
        convertingCurrency: "",
        originalCurrency: "",
        price: "",
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      phone: formData.phone,
      name: formData.name,
      password: formData.password,
      role: formData.role,
      convertingCurrency: formData.convertingCurrency,
      originalCurrency: "USD",
      price: formData.price,
    };

    let url = "";
    let queryKey = "";

    if (mode === "create" && form === "role") {
      url = "user/create-user";
      queryKey = "users";
      createMutation.mutate({ data: payload, url, queryKey });
    } else if (mode === "edit" && form === "role") {
      payload.id = initialData._id; // Add the user ID to the payload
      url = `user/update-user`;
      queryKey = "users";
      updateMutation.mutate({
        data: { newPassword: payload.password, ...payload },
        url,
        queryKey,
      });
    }else if (mode === "create" && form === "exchangeRates") {
      url = "exchange/add-exchangerate";
      queryKey = "exchangeRates"
      createMutation.mutate({ data: payload, url, queryKey });
    } else if (mode === "edit" && form === "exchangeRates") {
      payload.id = initialData._id; // Add the user ID to the payload
      url = `exchange/${initialData._id}`;
      queryKey = "exchangeRates"
      console.log(payload)
      updateMutation.mutate({ data: payload, url, queryKey });
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`fixed inset-0 flex items-center justify-end z-50 ${
          !visible && "hidden"
        }`}
      >
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={onCancel}
        ></div>
        <div className="relative bg-white w-3/5 md:w-2/6 h-[97%] rounded-lg shadow-lg md:mr-10">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl">{title}</h2>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={onCancel}
                className="text-xl p-[1px] px-[5px] border-[1px]"
              >
                &times;
              </button>
            </div>
          </div>
          <div className="p-8 overflow-y-auto h-4/5">
            {form === "exchangeRates" ? (
              <form>
                {" "}
                <div className="mb-6">
                  <input
                    name="originalCurrency"
                    value={"USD"}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Original Currency"
                    style={{ backgroundColor: "#5B48BB08" }}
                  />
                </div>
                <div className="mb-6">
                  <input
                    name="convertingCurrency"
                    value={formData.convertingCurrency}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Converting Currency"
                    style={{ backgroundColor: "#5B48BB08" }}
                  />
                </div>
                <div className="mb-6">
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="price"
                    placeholder="Price"
                    style={{ backgroundColor: "#5B48BB08" }}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="text-white flex items-center justify-center py-3 px-4 rounded-lg w-full button-color"
                  >
                    {mode === "create" ? "Save" : "Update"}
                  </button>
                </div>
              </form>
            ) : (
              <form>
                {" "}
                <div className="mb-6">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="name"
                    placeholder="Name"
                    style={{ backgroundColor: "#5B48BB08" }}
                  />
                </div>
                <div className="mb-6">
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="email"
                    placeholder="Email"
                    style={{ backgroundColor: "#5B48BB08" }}
                  />
                </div>
                <div className="mb-6">
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="tel"
                    placeholder="Phone Number"
                    style={{ backgroundColor: "#5B48BB08" }}
                  />
                </div>
                <div className="mb-6">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                    style={{ backgroundColor: "#5B48BB08" }}
                  />
                </div>
                <div className="mb-6">
                  <div
                    className="flex items-center border rounded-lg py-3 px-3"
                    style={{ backgroundColor: "#5B48BB08" }}
                  >
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full bg-transparent border-none text-gray-700 leading-tight focus:outline-none"
                    >
                      <option value="" disabled>
                        Role
                      </option>
                      <option value="Admin">Admin</option>
                      <option value="Employee">Employee</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="text-white flex items-center justify-center py-3 px-4 rounded-lg w-full button-color"
                  >
                    {mode === "create" ? "Save" : "Update"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
