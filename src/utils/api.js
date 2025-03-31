// Define API base URL based on environment
const API_BASE_URL = import.meta.env.PROD
  ? "https://formsubmit.co/ajax/skillstation.academy@gmail.com" // Using FormSubmit.co service
  : "http://localhost:3001";

// API endpoints
export const API_ENDPOINTS = {
  SEND_EMAIL: API_BASE_URL,
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
  // Format data for FormSubmit
  const formattedPayload = {
    name: payload.formData.fullName,
    email: payload.formData.email,
    subject: `New Registration: ${payload.registrationId}${
      payload.workshopName ? ` - ${payload.workshopName}` : " - TiSAT"
    }`,
    message: formatEmailMessage(payload),
  };

  return fetchAPI(API_ENDPOINTS.SEND_EMAIL, {
    method: "POST",
    body: JSON.stringify(formattedPayload),
  });
};

// Helper to format the email message
const formatEmailMessage = (payload) => {
  const {
    formData,
    registrationType,
    registrationId,
    educationalStatus,
    workshopName,
  } = payload;

  let message = `
Registration ID: ${registrationId}
Registration Type: ${registrationType}
${workshopName ? `Workshop: ${workshopName}` : "Program: TiSAT-2025"}
Full Name: ${formData.fullName}
Email: ${formData.email}
Mobile: ${formData.mobile}
Preferred Mode: ${formData.preferredMode}
`;

  if (registrationType === "parent") {
    message += `
Relationship to Student: ${formData.relationship}
`;
  } else {
    message += `
Date of Birth: ${formData.dateOfBirth}
Gender: ${formData.gender}
Educational Status: ${educationalStatus}
Institution Name: ${formData.institutionName}
Year of Study: ${formData.yearOfStudy}
Previous Workshop: ${formData.previousWorkshop}
Reason for Joining: ${formData.reasonForJoining}
Heard About Us From: ${formData.hearAboutUs}
`;
  }

  return message;
};
