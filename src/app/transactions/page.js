"use client";
import React, { useState, useEffect } from "react";
import { Input, Select, Dropdown, Table, Pagination } from "antd";
import { FaRegUserCircle, FaSearch, FaPlus, FaRegEdit } from "react-icons/fa";
import { BsFiletypeJson } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import CustomModal from "@/components/CustomModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Papa from "papaparse";
import { toast, ToastContainer } from "react-toastify";
import {
  useUpdateMutation,
  useDeleteMutation,
  useGetQuery,
  useCreateMutation,
} from "../query";
import "react-toastify/dist/ReactToastify.css";
import withAuth from "../withauth";
import { createRequest, getFilteredMembers } from "../api";
import { useRouter } from "next/navigation";
import { useStateContext } from "../context/stateContext";
import Form from "@/components/Form";
import { FaPrint } from "react-icons/fa6";
import { printReceipt } from "../print";

const { Option } = Select;

const Page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [fullData, setFullData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPremiumPage, setCurrentPremiumPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { stateType, setStateType } = useStateContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);

  const { data, error, isLoading } = useGetQuery({
    queryKey: ["Transaction", currentPage, pageSize],
    url: user
      ? `transaction/get-all-transaction/${user._id}?page=${currentPage}&limit=${pageSize}`
      : null,
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

  useEffect(() => {
    if (data) {
      setFullData(data?.transactions);
      setFilteredData(data?.transactions);
    }
    if (stateType) {
      typeOfMember(stateType);
    }
  }, [data, stateType]);

  const queryClient = useQueryClient();
  const router = useRouter();
  const updateMutation = useUpdateMutation();
  const deleteMutation = useDeleteMutation();

  const showModal = (mode, record = null) => {
    setModalMode(mode);
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const [senderData, setsenderData] = useState({
    email: "",
    phone: "",
    city: "",
    country: "",
    zipcode: "",
    lastName: "",
    middleName: "",
    street: "",
    firstName: "",
  });
  const [recieverData, setrecieverData] = useState({
    email: "",
    phone: "",
    city: "",
    country: "",
    zipcode: "",
    lastName: "",
    middleName: "",
    street: "",
    firstName: "",
  });
  const [transactionData, setTransactionData] = useState({
    sendingAmount: Number,
    receivingAmount: Number,
    sendingCurrency: "USD",
    recievingCurrency: "",
    usdFee: "",
    fee: Number,
    totalAmount: Number,
  });

  const createMutation = useCreateMutation();

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
    setCurrentStep(1);
    setsenderData({
      email: "",
      phone: "",
      city: "",
      country: "",
      zipcode: "",
      lastName: "",
      middleName: "",
      street: "",
      firstName: "",
    });
    setrecieverData({
      email: "",
      phone: "",
      city: "",
      country: "",
      zipcode: "",
      lastName: "",
      middleName: "",
      street: "",
      firstName: "",
    });
    setTransactionData({
      sendingAmount: Number,
      receivingAmount: Number,
      sendingCurrency: "USD",
      recievingCurrency: "",
    });
  };

  const handleSenderData = async (e) => {
    e.preventDefault();
    if (!senderData.firstName || !senderData.phone || !senderData.country) {
      toast.error("Phone Number, FirstName and Country is required");
      return;
    }
    setCurrentStep(2);
  };
  const handleRecieverData = async (e) => {
    e.preventDefault();
    if (
      !recieverData.firstName ||
      !recieverData.phone ||
      !recieverData.country
    ) {
      toast.error("Phone Number, FirstName and Country is required");
      return;
    }
    setCurrentStep(3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(transactionData);
    if (
      !transactionData.sendingAmount ||
      !transactionData.receivingAmount ||
      !transactionData.sendingCurrency ||
      !transactionData.recievingCurrency
    ) {
      toast.error("All fields are required");
      return;
    }
    let url = "transaction";
    let queryKey = "Transaction";

    const response = await createMutation.mutateAsync({
      data: { senderData, ...transactionData, user: user._id, recieverData },
      url,
      queryKey,
    });

    // Use the response data here
    handleCancel();
    setCurrentStep(1);
    return response?.data;
  };

  const handleSaveAndPrint = async (e) => {
    const data = await handleSubmit(e);
    if (data) {
      printReceipt(data?.newTransaction);
    }
  };
  const [selectedMemberType, setSelectedMemberType] = useState("");

  const typeOfMember = async (value) => {
    setSelectedMemberType(value);

    if (value === "All") {
      setFilteredData(fullData); // Show all data if "All" is selected
      setSelectedMemberType("");
      setStateType("");
      return;
    }

    try {
      // Fetch the filtered data based on the selected member type
      const data = await getFilteredMembers(value, currentPage, pageSize);
      setFilteredData(data); // Update filtered data with the response
    } catch (error) {
      toast.error("Failed to fetch member data."); // Show user-friendly error message
    }
  };

  const actions =
    userData?.role === "Admin"
      ? [
          {
            key: "1",
            icon: <FaRegEdit size={20} />,
            label: "Edit",
            onClick: (record) => router.push(`/edituser/${record?._id}`),
          },
          {
            key: "2",
            icon: <FaPrint size={20} />,
            label: "Print",
            onClick: (record) => printReceipt(record),
          },
          {
            key: "3",
            icon: <RiDeleteBin6Line size={20} />,
            label: "Delete",
            onClick: (record) =>
              deleteMutation.mutate({
                id: record._id,
                url: `transaction`,
                queryKey: "Transaction",
              }),
          },
        ]
      : [];

  const columns = [
    {
      title: "Sender",
      render: (data) => (
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="ml-2 font-bold">
              {data?.sender?.firstName} {data?.sender?.middleName}{" "}
              {data?.sender?.lastName}
            </span>
            <span className="ml-2">{data.sender?.phone}</span>
            <span className="ml-2">{data.sender?.email}</span>
            <span className="ml-2">
              {data.sender?.country} {data?.sender?.city}
            </span>
            <span className="ml-2">
              {data.sender?.street} {data?.sender?.zipcode}
            </span>
          </div>
        </div>
      ),
      className: "hidden md:table-cell",
    },
    {
      title: "Reciever",
      render: (data) => (
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="ml-2 font-bold">
              {data.receiver?.firstName} {data?.receiver?.middleName}{" "}
              {data.receiver?.lastName}
            </span>
            <span className="ml-2">{data.receiver?.phone}</span>
            <span className="ml-2">{data.receiver?.email}</span>
            <span className="ml-2">
              {data.receiver?.country} {data?.receiver?.city}
            </span>
            <span className="ml-2">
              {data.receiver?.street} {data?.receiver?.zipcode}
            </span>
          </div>
        </div>
      ),
      className: "hidden md:table-cell",
    },
    {
      title: "Sending Amount",
      dataIndex: "sendingAmount",
      key: "sendingAmount",
      className: "hidden md:table-cell",
    },
    {
      title: "Sending Currency",
      dataIndex: "sendingCurrency",
      key: "sendingCurrency",
      className: "hidden md:table-cell",
    },
    {
      title: "Receiving Amount",
      dataIndex: "receivingAmount",
      key: "receivingAmount",
      className: "hidden md:table-cell",
    },
    {
      title: "Receiving Currency",
      dataIndex: "recievingCurrency",
      key: "recievingCurrency",
      className: "hidden md:table-cell",
    },
    {
      title: "Made By",
      dataIndex: "madeBy",
      key: "madeBy",
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

  const flattenTransactions = (transactions) => {
    return transactions.map((transaction) => ({
      "Sender FirstName": transaction.sender.firstName,
      "Sender MiddleName": transaction.sender.middleName,
      "Sender LastName": transaction.sender.lastName,
      "Sender Country": transaction.sender.country,
      "Sender Street": transaction.sender.street,
      "Sender Zipcode": transaction.sender.zipcode,
      "Sender Email": transaction.sender.email,
      "Sender Phone": transaction.sender.phone,
      "Receiver FirstName": transaction.receiver.firstName,
      "Receiver MiddleName": transaction.receiver.middleName,
      "Receiver LastName": transaction.receiver.lastName,
      "Receiver Country": transaction.receiver.country,
      "Receiver Street": transaction.receiver.street,
      "Receiver Zipcode": transaction.receiver.zipcode,
      "Receiver Email": transaction.receiver.email,
      ReceiverPhone: transaction.receiver.phone,
      MadeBy: transaction.madeBy,
      "Sending Currency": transaction.sendingCurrency,
      "Receiving Currency": transaction.recievingCurrency,
      "Sending Amount": transaction.sendingAmount,
      "Receiving Amount": transaction.receivingAmount,
      createdAt: transaction.createdAt,
    }));
  };

  const downloadCSV = () => {
    // Assume `transactions` is the data retrieved from your database
    const flattenedData = flattenTransactions(filteredData);

    // Convert flattened data to CSV format
    const csv = Papa.unparse(flattenedData);

    // Create a link element, set its href to the CSV data, and simulate a click to download the file
    const link = document.createElement("a");
    link.href = `data:text/csv;charset=utf-8,%EF%BB%BF${encodeURIComponent(
      csv
    )}`;
    link.download = "transactions.csv";
    link.click();
  };

  const mobileColumns = [
    {
      title: "Details",
      render: (record) => (
        <div className="flex flex-col p-4 bg-gray-100 rounded-md mb-4">
          <div className="flex items-center mb-2">
            <span className="ml-2 font-semibold">
              Sender:{" "}
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span className="ml-2 font-bold">
                      {record?.sender?.firstName} {record?.sender?.middleName}{" "}
                      {record?.sender?.lastName}
                    </span>
                    <span className="ml-2">{record.sender?.phone}</span>
                    <span className="ml-2">{record.sender?.email}</span>
                    <span className="ml-2">
                      {record.sender?.country} {record?.sender?.city}
                    </span>
                    <span className="ml-2">
                      {record.sender?.street} {record?.sender?.zipcode}
                    </span>
                  </div>
                </div>
              </div>
            </span>
          </div>
          <div className="flex items-center mb-2">
            <span className="ml-2 font-semibold">
              Reciever:{" "}
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span className="ml-2 font-bold">
                      {record?.receiver?.firstName}{" "}
                      {record?.receiver?.middleName}{" "}
                      {record?.receiver?.lastName}
                    </span>
                    <span className="ml-2">{record.receiver?.phone}</span>
                    <span className="ml-2">{record.receiver?.email}</span>
                    <span className="ml-2">
                      {record.receiver?.country} {record?.receiver?.city}
                    </span>
                    <span className="ml-2">
                      {record.receiver?.street} {record?.receiver?.zipcode}
                    </span>
                  </div>
                </div>
              </div>
            </span>
          </div>
          <div className="mb-1">
            <span className="font-semibold">Sending Amount: </span>
            {record.sendingAmount}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Sending Currency: </span>
            {record.sendingCurrency}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Receiving Amount: </span>
            {record.receivingAmount}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Receiving Currency: </span>
            {record.recievingCurrency}
          </div>
          <div className="mb-1">
            <span className="font-semibold">Made By: </span>
            {record.madeBy}
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

  // Handle page change
  const onPageChange = (page) => {
    setCurrentPremiumPage(page);
  };

  // Paginate the data
  const paginatedData = filteredData
    ? filteredData.slice(
        (currentPremiumPage - 1) * pageSize,
        currentPremiumPage * pageSize
      )
    : [];

  return (
    <div className="p-8">
      <ToastContainer />
      <div className="flex justify-between items-center">
        <div className="grid grid-cols-2 gap-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={downloadCSV}
            className="text-white flex items-center justify-center py-2 px-4 rounded-lg button-color"
          >
            <FaPlus className="mr-2" />
            <span className="text-[16px]">Download CSV</span>
          </button>
          <button
            onClick={() => showModal("create")}
            className="text-white flex items-center justify-center py-2 px-4 rounded-lg button-color"
          >
            <FaPlus className="mr-2" />
            <span className="text-[16px]">Make Transaction</span>
          </button>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full bg-white rounded-md p-4">
          <div className="text-[20px] font-semibold mb-3">Transactions</div>
          {selectedMemberType === "Blocked" ||
          selectedMemberType === "Free" ||
          selectedMemberType === "Premium" ||
          selectedMemberType === "Rejected" ||
          selectedMemberType === "Vip" ? (
            <>
              {" "}
              <Table
                dataSource={paginatedData}
                columns={columns.concat(mobileColumns)}
                rowKey="id"
                pagination={false}
                className="rounded-lg table-responsive"
              />
              {/* Pagination component */}
              <Pagination
                current={currentPremiumPage}
                pageSize={pageSize}
                total={filteredData?.length}
                onChange={onPageChange}
                className="mt-4 flex justify-center"
              />
            </>
          ) : (
            <>
              {" "}
              <Table
                columns={columns.concat(mobileColumns)}
                dataSource={filteredData}
                rowKey="_id"
                pagination={false}
              />
              <Pagination
                className="mt-4 justify-center"
                current={currentPage}
                pageSize={pageSize}
                total={data?.pagination?.totalUsers}
                onChange={(page) => {
                  setCurrentPage(page);
                }}
              />
            </>
          )}
        </div>
      </div>

      {currentStep === 1 && (
        <Form
          data={senderData}
          setdata={setsenderData}
          handleSave={handleSenderData}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          userId={user?._id}
          title={"Sender"}
        />
      )}
      {currentStep === 2 && (
        <Form
          title={"Reciever"}
          data={recieverData}
          senderPhone={senderData?.phone}
          setdata={setrecieverData}
          userId={user?._id}
          handleSave={handleRecieverData}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
        />
      )}
      {currentStep === 3 && (
        <Form
          title={"Transaction"}
          data={transactionData}
          setdata={setTransactionData}
          userId={user?._id}
          handleSave={handleSubmit}
          handleCancel={handleCancel}
          handleSaveAndPrint={handleSaveAndPrint}
          isModalVisible={isModalVisible}
        />
      )}
    </div>
  );
};

export default withAuth(Page);
