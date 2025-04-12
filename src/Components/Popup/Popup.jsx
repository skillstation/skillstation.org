import React, { useState } from "react";
import "./Popup.css";
import { sendRegistrationEmail } from "../../utils/api";

const Popup = ({ isOpen, onClose }) => {
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create form data object similar to workshop registration
      const formData = {
        fullName: "WhatsApp Inquiry",
        email: "whatsapp@inquiry.com", // Placeholder email
        mobile: whatsappNumber,
        preferredMode: "WhatsApp",
        type: "WhatsApp Inquiry",
      };

      // Send email using the existing function
      await sendRegistrationEmail({
        formData,
        registrationType: "whatsapp_inquiry",
        registrationId: `WA${Date.now()}`, // Generate a unique ID
        workshopName: "JEE Mentorship Cohort Programme",
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to submit WhatsApp number. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {showSuccess ? (
          <div className="success-message">
            <h2>Thank you!</h2>
            <p>We'll send the details to your WhatsApp number shortly.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Applications Invited for the Prestigious JEE Mentorship Cohort
              Programme via Young Leaders Fellowship
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group relative">
                <div className="flex items-center">
                  <span className="absolute left-2 text-gray-500">+91</span>
                  <input
                    className="w-full p-2 pl-10 border border-gray-300 rounded-md"
                    type="tel"
                    placeholder="Enter your WhatsApp number"
                    value={whatsappNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      // Only allow numbers and limit to 10 digits
                      if (/^\d*$/.test(value) && value.length <= 10) {
                        setWhatsappNumber(value);
                      }
                    }}
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit phone number"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send details to my WhatsApp"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Popup;
