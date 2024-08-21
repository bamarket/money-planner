"use client";
import React, { useEffect, useState } from "react";
import { Dropdown, Modal, Select, Table } from "antd";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import CustomModal from "@/components/CustomModal";
import withAuth from "../withauth";
import { ToastContainer, toast } from "react-toastify";
import { useDeleteMutation, useGetQuery, useUpdateMutation } from "../query";

const { Option } = Select;
const Page = () => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const deleteMutation = useDeleteMutation();
  const updateMutation = useUpdateMutation(); // Add update mutation
  const [user, setUser] = useState(null);
  const { data, error, isLoading } = useGetQuery({
    queryKey: ["exchangeRates"],
    url: "exchange/exchangerates",
  });

  const {
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useGetQuery({
    queryKey: ["User"],
    url: `user/user/${user?._id}`,
  });

  useEffect(() => {
    let storedUser = localStorage.getItem("usermoneyplanner");
    storedUser = storedUser ? JSON.parse(storedUser) : null;
    setUser(storedUser);
  }, [userData]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const showModal = (mode, record = null) => {
    setModalMode(mode);
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handleToggleStatus = (record) => {
    const newStatus = record.status === "on" ? "off" : "on";
    updateMutation.mutate({
      id: record._id,
      url: `package/${record._id}`,
      data: { status: newStatus },
      queryKey: "Package",
    });
  };

  const actions =
    userData?.role === "Admin"
      ? [
          {
            key: "1",
            icon: <FaRegEdit size={20} />,
            label: "Edit",
            onClick: (record) => showModal("edit", record),
          },
          {
            key: "2",
            icon: <RiDeleteBin6Line size={20} />,
            label: "Delete",
            onClick: (record) =>
              deleteMutation.mutate({
                id: record._id,
                url: `exchange`,
                queryKey: "exchangeRates",
              }),
          },
        ]
      : [];

  const columns = [
    {
      title: "Orignal Currency",
      key: "originalCurrency",
      dataIndex: "originalCurrency",
      className: "hidden md:table-cell",
    },
    {
      title: "Converting Currency",
      key: "convertingCurrency",
      dataIndex: "convertingCurrency",
      className: "hidden md:table-cell",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      className: "hidden md:table-cell",
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
      className: "hidden md:table-cell",
    },
  ];
  const mobileColumns = [
    {
      title: "Details",
      render: (record) => (
        <div className="flex flex-col p-4 bg-gray-100 rounded-md mb-4">
          <div className="mb-1">
            <span className="font-semibold">Orignal Currency: </span>
            {record.originalCurrency}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Converting Currency: </span>
            {record.convertingCurrency}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Price: </span>
            {record.price}
          </div>
          <div className="mt-2">
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
          </div>
          <hr className="border-t border-gray-300 mt-2" />{" "}
          {/* Breakpoint line */}
        </div>
      ),
      responsive: ["xs"], // Display on extra small devices
    },
  ];

  return (
    <div className="premium p-8">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">All Exhange Rates</div>
        <button
          onClick={() => showModal("create")}
          className="button-color text-white flex items-center justify-center py-2 px-4 rounded-lg"
        >
          <FaPlus className="mr-2" />
          <span className="text-[16px]">Add New exchange rates</span>
        </button>
      </div>

      <div>
        <Table
          dataSource={data}
          columns={columns.concat(mobileColumns)}
          rowKey="id"
          pagination={false}
          className="rounded-lg table-responsive"
        />
      </div>
      <CustomModal
        title={modalMode === "edit" ? "Edit Member" : "Add New Package"}
        visible={isModalVisible}
        onCancel={handleCancel}
        form="exchangeRates"
        mode={modalMode}
        isprice={true}
        isPckgName={true}
        noEmail={true}
        packageStatus={true}
        noImage={true}
        initialData={selectedRecord}
      />
    </div>
  );
};

export default withAuth(Page);
