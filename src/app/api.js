import axios from "axios";

const API_BASE_URL = "https://money-planner-server.vercel.app/api";

// const API_BASE_URL = "http://localhost:5000/api";
// Function to create a role
export const createRequest = (data, url, token) => {
  return axios.post(`${API_BASE_URL}/${url}`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
};

// Function to update a role
export const updateRequest = (data, url, token) => {
  return axios.put(`${API_BASE_URL}/${url}`, data, {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
};

// Function to delete a role
export const deleteRequest = (roleId, url, token) => {
  return axios.delete(`${API_BASE_URL}/${url}/${roleId}`, {
    headers: {
      "x-access-token": token,
    },
  });
};

// Function to get roles (example of a GET request)
export const getRequest = (url, token) => {
  return axios.get(`${API_BASE_URL}/${url}`, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const getFilteredMembers = async (memberType, token) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/type-of-member/${memberType}`,
      {
        headers: {
          "x-access-token": token,
        },
      }
    );
    return response.data; // Return the data directly
  } catch (error) {
    console.error("Error fetching member data:", error);
    throw new Error("Failed to fetch member data.");
  }
};
