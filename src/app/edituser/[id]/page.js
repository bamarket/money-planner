"use client";
import { useState, useEffect } from "react";
import { useGetQuery, useUpdateMutation } from "../../query";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { countries } from "countries-list";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const { id } = useParams();
  const [priceAccordingToUsd, setPriceAccordingToUsd] = useState()
  const [senderData, setsenderData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    zipcode: "",
    street: "",
  });

  const [receiverData, setreceiverData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    zipcode: "",
    street: "",
  });

  const [transactionData, setTransactionData] = useState({
    sendingAmount: "",
    receivingAmount: "",
    sendingCurrency: "",
    recievingCurrency: "",
  });
  const { data, error, isLoading } = useGetQuery({
    queryKey: ["User", id],
    url: `transaction/get-transaction-with-id/${id}`,
  });

  const {
    data: exchangeRates,
    errorr,
    isLoadingg,
  } = useGetQuery({
    queryKey: ["exchangeRates"],
    url: "exchange/exchangerates",
  });


  useEffect(() => {
    if (data) {
      setsenderData(data?.sender);
      setreceiverData(data?.receiver);
      setTransactionData({
        sendingAmount: data?.sendingAmount,
        receivingAmount: data?.receivingAmount,
        sendingCurrency: data?.sendingCurrency,
        recievingCurrency: data?.recievingCurrency,
      });
    }
  }, [data]);


  const handleChange = (e, setState, state) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const updateMutation = useUpdateMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `transaction/${id}`;
    const queryKey = "Transaction";
    updateMutation.mutate({
      data: { sender: senderData, receiver: receiverData, ...transactionData },
      url,
      queryKey,
    });
  };

  if (isLoading || isLoadingg) {
    return <div>Loading...</div>;
  }
  if (error || errorr) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <ToastContainer />
      <form className="max-w-7xl mx-auto p-4 mb-5">
        <h1 className="text-2xl font-bold mb-4">Sender Data</h1>

        {/* Sender Data */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sender First Name */}
          <div className="mb-6">
            <label className="block text-gray-700">Sender First Name</label>
            <input
              type="text"
              name="firstName"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={senderData.firstName}
              onChange={(e) => handleChange(e, setsenderData, senderData)}
              required
            />
          </div>

          {/* Sender Last Name */}
          <div className="mb-6">
            <label className="block text-gray-700">Sender Last Name</label>
            <input
              type="text"
              name="lastName"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={senderData.lastName}
              onChange={(e) => handleChange(e, setsenderData, senderData)}
              required
            />
          </div>

          {/* Sender Email */}
          <div className="mb-6">
            <label className="block text-gray-700">Sender Email</label>
            <input
              type="email"
              name="email"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={senderData.email}
              onChange={(e) => handleChange(e, setsenderData, senderData)}
              required
            />
          </div>

          {/* Sender Phone */}
          <div className="mb-6">
            <label className="block text-gray-700">Sender Phone</label>
            <input
              type="text"
              name="phone"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={senderData.phone}
              onChange={(e) => handleChange(e, setsenderData, senderData)}
              required
            />
          </div>

          {/* Sender City */}
          <div className="mb-6">
            <label className="block text-gray-700">Sender City</label>
            <input
              type="text"
              name="city"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={senderData.city}
              onChange={(e) => handleChange(e, setsenderData, senderData)}
              required
            />
          </div>

          {/* Sender Country */}
          <div className="mb-6">
            <label className="block text-gray-700">Sender Country</label>
            <select
              name="country"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={senderData.country}
              onChange={(e) => handleChange(e, setsenderData, senderData)}
            >
              <option value="" disabled>
                Country
              </option>
              {Object.keys(countries).map((key, indx) => (
                <option key={indx} value={countries[key].name}>
                  {countries[key].name}
                </option>
              ))}
            </select>
          </div>

          {/* Sender Zipcode */}
          <div className="mb-6">
            <label className="block text-gray-700">Sender Zipcode</label>
            <input
              type="text"
              name="zipcode"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={senderData.zipcode}
              onChange={(e) => handleChange(e, setsenderData, senderData)}
              required
            />
          </div>

          {/* Sender Street */}
          <div className="mb-6">
            <label className="block text-gray-700">Sender Street</label>
            <input
              type="text"
              name="street"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={senderData.street}
              onChange={(e) => handleChange(e, setsenderData, senderData)}
              required
            />
          </div>
        </div>

        {/* Receiver Data */}
        <h2 className="text-xl font-semibold mb-4">Receiver Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Receiver First Name */}
          <div className="mb-6">
            <label className="block text-gray-700">Receiver First Name</label>
            <input
              type="text"
              name="firstName"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={receiverData.firstName}
              onChange={(e) => handleChange(e, setreceiverData, receiverData)}
              required
            />
          </div>

          {/* Receiver Last Name */}
          <div className="mb-6">
            <label className="block text-gray-700">Receiver Last Name</label>
            <input
              type="text"
              name="lastName"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={receiverData.lastName}
              onChange={(e) => handleChange(e, setreceiverData, receiverData)}
              required
            />
          </div>

          {/* Receiver Email */}
          <div className="mb-6">
            <label className="block text-gray-700">Receiver Email</label>
            <input
              type="email"
              name="email"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={receiverData.email}
              onChange={(e) => handleChange(e, setreceiverData, receiverData)}
              required
            />
          </div>

          {/* Receiver Phone */}
          <div className="mb-6">
            <label className="block text-gray-700">Receiver Phone</label>
            <input
              type="text"
              name="phone"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={receiverData.phone}
              onChange={(e) => handleChange(e, setreceiverData, receiverData)}
              required
            />
          </div>

          {/* Receiver City */}
          <div className="mb-6">
            <label className="block text-gray-700">Receiver City</label>
            <input
              type="text"
              name="city"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={receiverData.city}
              onChange={(e) => handleChange(e, setreceiverData, receiverData)}
              required
            />
          </div>

          {/* Receiver Country */}
          <div className="mb-6">
            <label className="block text-gray-700">Receiver Country</label>
            <select
              name="country"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={receiverData.country}
              onChange={(e) => handleChange(e, setreceiverData, receiverData)}
            >
              <option value="" disabled>
                Country
              </option>
              {Object.keys(countries).map((key, indx) => (
                <option key={indx} value={countries[key].name}>
                  {countries[key].name}
                </option>
              ))}
            </select>
          </div>

          {/* Receiver Zipcode */}
          <div className="mb-6">
            <label className="block text-gray-700">Receiver Zipcode</label>
            <input
              type="text"
              name="zipcode"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={receiverData.zipcode}
              onChange={(e) => handleChange(e, setreceiverData, receiverData)}
              required
            />
          </div>

          {/* Receiver Street */}
          <div className="mb-6">
            <label className="block text-gray-700">Receiver Street</label>
            <input
              type="text"
              name="street"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={receiverData.street}
              onChange={(e) => handleChange(e, setreceiverData, receiverData)}
              required
            />
          </div>
        </div>

        {/* Transaction Data */}
        <h2 className="text-xl font-semibold mb-4">Transaction Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sending Amount */}
          <div className="mb-6">
            <label className="block text-gray-700">Sending Amount</label>
            <input
              type="text"
              name="sendingAmount"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={transactionData.sendingAmount}
              onChange={(e) =>
                handleChange(e, setTransactionData, transactionData)
              }
              required
            />
          </div>

          {/* Receiving Amount */}
          {/* <div className="mb-6">
            <label className="block text-gray-700">Receiving Amount</label>
            <input
              type="text"
              name="receivingAmount"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={transactionData.receivingAmount}
              onChange={(e) =>
                handleChange(e, setTransactionData, transactionData)
              }
              required
            />
          </div> */}

          {/* Sending Currency */}
          <div className="mb-6">
            <label className="block text-gray-700">Sending Currency</label>

            <select
              name="sendingCurrency"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              defaultValue={transactionData.sendingCurrency}
              onChange={(e) =>
                handleChange(e, setTransactionData, transactionData)
              }
            >
              <option value="" disabled>
                Sending Currency
              </option>
              <option value="USD">Usd</option>
              {/* Add more currencies as needed */}
            </select>
          </div>

          {/* Receiving Currency */}
          <div className="mb-6">
            <label className="block text-gray-700">Receiving Currency</label>
            <select
              name="recievingCurrency"
              className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ backgroundColor: "#5B48BB08" }}
              value={transactionData.recievingCurrency}
              onChange={(e) => {
                const selectedIndex = e.target.selectedIndex - 1; // Adjust index as the first option is the placeholder
                const selectedElement = exchangeRates[selectedIndex];
                setPriceAccordingToUsd(selectedElement.price)
                const price = selectedElement?.price * transactionData?.sendingAmount;

                setTransactionData((prevdata) => ({
                  ...prevdata,
                  receivingAmount: price,
                  recievingCurrency: e.target.value
                }));
              }}
            >
              <option value="" disabled>
                Sending Currency
              </option>
              {Array.isArray(exchangeRates) &&
                exchangeRates.map((element, indx) => {
                  return (
                    <option
                      onClick={() => setPrice(element)}
                      key={indx}
                      value={element.convertingCurrency}
                    >
                      {element.convertingCurrency}
                    </option>
                  );
                })}
            </select>
          </div>

          <div className="mb-6">
            <h1>
              The Recieving Amount is {data?.receivingAmount}{" "}
              {data?.recievingCurrency}
            </h1>
            <h1 className="my-2">
               1 {transactionData?.sendingCurrency} = {priceAccordingToUsd}  {transactionData?.recievingCurrency}{" "}
            </h1>
            <h1>
              New Recieving Amount will be {transactionData?.receivingAmount}{" "}
              {transactionData?.recievingCurrency}
            </h1>
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
          onClick={handleSubmit}
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditUser;
