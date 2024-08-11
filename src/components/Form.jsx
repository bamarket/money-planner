import { Drawer, List } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { countries } from "countries-list";
import { useGetQuery } from "@/app/query";

const Form = ({
  data,
  setdata,
  handleSave,
  handleCancel,
  isModalVisible,
  title,
}) => {
  const [open, setOpen] = useState(false);
  const [drawerData, setDrawerdata] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));
  };

  const {
    data: exchangeRates,
    error,
    isLoading,
  } = useGetQuery({
    queryKey: ["exchangeRates"],
    url: "exchange/exchangerates",
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(exchangeRates);

  const showDrawer = async (value) => {
    setOpen(true);
    let response = await axios.get(`https://money-planner-server.vercel.app/api/${value}`);
    console.log(response);
    setDrawerdata(response?.data);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleClick = (item) => {
    // Handle the click event and get the values
    console.log("Clicked item:", item);
    setdata(item);
    onClose();
    // You can perform other actions here, such as updating state or triggering other functions
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-end z-50 ${
        !isModalVisible && "hidden"
      }`}
    >
      <Drawer title="Select Previous Sender" onClose={onClose} open={open}>
        <List
          itemLayout="horizontal"
          dataSource={drawerData}
          renderItem={(item, index) => (
            <List.Item
              className="cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <List.Item.Meta
                title={
                  <a href="https://ant.design" className="font-bold text-lg">
                    {item.firstName}
                  </a>
                }
                description={
                  <div className="text-gray-700">
                    <p>Email: {item.email}</p>
                    <p>Phone: {item.phone}</p>
                    <p>Country: {item.country}</p>
                    <p>Country: {item.city}</p>
                  </div>
                }
              />
              <hr />
            </List.Item>
          )}
        />
      </Drawer>
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={handleCancel}
      ></div>
      <div className="relative bg-white w-3/5 md:w-2/6 h-[97%] rounded-lg shadow-lg md:mr-10">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl">{title} Information</h2>
          <div className="flex items-center gap-2 ml-auto">
            {title === "Sender" && (
              <button
                type="submit"
                onClick={() => showDrawer("sender")}
                className="text-white flex items-center justify-center py-3 px-6 mr-3 rounded-lg"
                style={{ backgroundColor: "#803c19" }}
              >
                Select Previous {title}
              </button>
            )}
            {title === "Reciever" && (
              <button
                type="submit"
                onClick={() => showDrawer("reciever")}
                className="text-white flex items-center justify-center py-3 px-6 mr-3 rounded-lg"
                style={{ backgroundColor: "#803c19" }}
              >
                Select Previous {title}
              </button>
            )}
            <button
              onClick={handleCancel}
              className="text-xl p-[1px] px-[5px] border-[1px]"
            >
              &times;
            </button>
          </div>
        </div>
        <div className="p-8 overflow-y-auto h-4/5">
          {title === "Transaction" ? (
            <form>
              <div className="mb-6">
                <input
                  name="sendingAmount"
                  value={data?.sendingAmount}
                  onChange={handleChange}
                  className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  placeholder="Sending Amount"
                  style={{ backgroundColor: "#5B48BB08" }}
                />
              </div>
              <div className="mb-6">
                <div
                  className="flex items-center border rounded-lg py-3 px-3"
                  style={{ backgroundColor: "#5B48BB08" }}
                >
                  <select
                    name="sendingCurrency"
                    value={data?.sendingCurrency}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none text-gray-700 leading-tight focus:outline-none"
                  >
                    <option value="" disabled>
                      Sending Currency
                    </option>
                    <option value={"USD"}>USD</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <input
                  name="receivingAmount"
                  value={data.receivingAmount}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  placeholder="Recieving Amount"
                  style={{ backgroundColor: "#5B48BB08" }}
                />
              </div>
              <div className="mb-6">
                <div
                  className="flex items-center border rounded-lg py-3 px-3"
                  style={{ backgroundColor: "#5B48BB08" }}
                >
                  <select
                    name="recievingCurrency"
                    value={data?.recievingCurrency}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none text-gray-700 leading-tight focus:outline-none"
                  >
                    <option value="" disabled>
                      Recieving Currency
                    </option>
                    {exchangeRates.map((element, indx) => {
                      return (
                        <option key={indx} value={element.convertingCurrency}>
                          {element.convertingCurrency}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="text-white flex items-center justify-center py-3 px-4 rounded-lg w-full button-color"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <form>
              <div className="mb-6">
                <input
                  name="firstName"
                  value={data.firstName}
                  onChange={handleChange}
                  className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="First Name"
                  style={{ backgroundColor: "#5B48BB08" }}
                />
              </div>
              <div className="flex">
                <div className="mb-6 me-4 w-1/2">
                  <input
                    name="middleName"
                    value={data.middleName}
                    onChange={handleChange}
                    className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Middle Name"
                    style={{ backgroundColor: "#5B48BB08" }}
                  />
                </div>
                <div className="mb-6  w-1/2">
                  <input
                    name="lastName"
                    value={data.lastName}
                    onChange={handleChange}
                    className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Last Name"
                    style={{ backgroundColor: "#5B48BB08" }}
                  />
                </div>
              </div>
              <div className="mb-6">
                <div
                  className="flex items-center border rounded-lg py-3 px-3"
                  style={{ backgroundColor: "#5B48BB08" }}
                >
                  <select
                    name="country"
                    value={data?.country}
                    onChange={handleChange}
                    className="w-full bg-transparent border-none text-gray-700 leading-tight focus:outline-none scrollable-menu"
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
              </div>
              <div className="mb-6">
                <input
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                  className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="City"
                  style={{ backgroundColor: "#5B48BB08" }}
                />
              </div>
              <div className="mb-6">
                <input
                  name="street"
                  value={data.street}
                  onChange={handleChange}
                  className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Street"
                  style={{ backgroundColor: "#5B48BB08" }}
                />
              </div>
              <div className="mb-6">
                <input
                  name="zipcode"
                  value={data.zipcode}
                  onChange={handleChange}
                  className="appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="Zip code"
                  style={{ backgroundColor: "#5B48BB08" }}
                />
              </div>
              <div className="mb-6">
                <input
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="email"
                  placeholder="Email (Optional)"
                  style={{ backgroundColor: "#5B48BB08" }}
                />
              </div>
              <div className="mb-6">
                <input
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded-lg w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="tel"
                  placeholder="Phone Number"
                  style={{ backgroundColor: "#5B48BB08" }}
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleSave}
                  className="text-white flex items-center justify-center py-3 px-4 rounded-lg w-full button-color"
                >
                  Continue
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;