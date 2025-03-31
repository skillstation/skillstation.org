// Define API base URL based on environment
const API_BASE_URL = import.meta.env.PROD
  ? "https://your-production-server-url.com" // Change this to your production server URL
  : "http://localhost:3001";

// API endpoints
export const API_ENDPOINTS = {
  SEND_EMAIL: `${API_BASE_URL}/api/send-email`,
};

// Generic fetch function with error handling
export const fetchAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Email API functions
export const sendRegistrationEmail = async (payload) => {
  return fetchAPI(API_ENDPOINTS.SEND_EMAIL, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
