"use client";
import React, { useEffect, useState } from "react";
import { Input, Select, Dropdown, Table, Pagination } from "antd";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { BsFiletypeJson } from "react-icons/bs";
import { FaPlus, FaRegPaperPlane, FaRegUser } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomModal from "@/components/CustomModal";
import Image from "next/image";
import { useDeleteMutation, useGetQuery } from "../query";
import withAuth from "../withauth";

const { Option } = Select;

const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [pageSize, setPageSize] = useState(10);
  const [userId, setUserId] = useState();
  const deleteMutation = useDeleteMutation();

  useEffect(() => {
    setUserId(JSON.parse(localStorage.getItem("usermoneyplanner")));
  
  }, []);

  const showModal = (mode, record = null) => {
    setModalMode(mode);
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };
  const { data, error, isLoading } = useGetQuery({
    queryKey: ["users", currentPage, pageSize], // Include currentPage and pageSize in queryKey
    url: `user/get-all-user?page=${currentPage}&limit=${pageSize}`,
  });

  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useGetQuery({
    queryKey: ["User"],
    url: `user/user/${userId?._id}`,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const actions = [
    {
      key: "1",
      icon: <FaRegEdit size={20} />,
      label: "Edit",
      onClick: (record) => showModal("edit", record),
    },
    {
      key: "4",
      icon: <RiDeleteBin6Line size={20} />,
      label: "Delete",
      onClick: (record) =>
        deleteMutation.mutate({
          id: record._id,
          url: `user/delete-user`,
          queryKey: "users",
        }),
    },
  ];

  const columns = [
    {
      title: "Name",
      render: (data) => (
        <div className="flex items-center">
          <Image
            src={
              Array.isArray(data?.image) && data?.image
                ? data?.image[0]
                : "/profile.jpeg"
            }
            width={30}
            height={30}
            className="w-8 h-8 object-cover rounded-full"
          />
          <span className="ml-2">{data.name}</span>
        </div>
      ),
    },
    {
      title: "Phone no",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: actions.map((action) => ({
              ...action,
              onClick: () => action.onClick(record),
            })),
          }}
          trigger={["click"]}
        >
          <svg
            className="cursor-pointer"
            width="6"
            height="13"
            viewBox="0 0 3 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="1.5" cy="1.5" r="1.5" fill="gray" />
            <circle cx="1.5" cy="6.5" r="1.5" fill="gray" />
            <circle cx="1.5" cy="11.5" r="1.5" fill="gray" />
          </svg>
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      {" "}
      {userData?.role !== "Admin" ? (
        <div className="flex w-full items-center justify-center h-screen">
          <h3>You dont have permission for this page</h3>
        </div>
      ) : (
        <div className="p-8">
          <div className="flex justify-between items-center">
            <div className="grid grid-cols-2 gap-4"></div>
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => showModal("create")}
                className="button-color text-white flex items-center justify-center py-2 px-4 rounded-lg"
              >
                <FaPlus className="mr-2" />
                <span className="text-[16px]">Add Role</span>
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full bg-white rounded-md p-4">
              <div className="text-[20px] font-semibold mb-3">All Roles</div>
              <Table
                dataSource={data?.users} // Update to match API response
                columns={columns}
                rowKey="_id" // Ensure this matches the key used in your data
                pagination={false}
                className="rounded-lg table-responsive"
              />
              <Pagination
                className="mt-4 justify-center"
                current={currentPage}
                pageSize={pageSize}
                total={data?.pagination.totalUsers} // Update to match API response
                onChange={(page) => {
                  setCurrentPage(page);
                }}
              />
            </div>
          </div>
          <CustomModal
            title={modalMode === "edit" ? "Edit Member" : "Add New Member"}
            visible={isModalVisible}
            onCancel={handleCancel}
            rolefield={"rolefield"}
            statusfield={"statusfield"}
            form={"role"}
            mode={modalMode}
            initialData={selectedRecord} // Pass selected record data for editing
          />
        </div>
      )}
    </>
  );
};

export default withAuth(Page);
