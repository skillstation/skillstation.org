require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API endpoint for sending emails
app.post("/api/send-email", async (req, res) => {
  try {
    const {
      formData,
      registrationType,
      registrationId,
      educationalStatus,
      workshopName,
    } = req.body;

    // Create HTML content based on registration type
    let detailsHtml = `
      <h2>New Registration${
        workshopName ? ` for ${workshopName}` : " for TiSAT-2025"
      }</h2>
      <p><strong>Registration ID:</strong> ${registrationId}</p>
      <p><strong>Registration Type:</strong> ${registrationType}</p>
      <p><strong>Full Name:</strong> ${formData.fullName}</p>
      <p><strong>Email:</strong> ${formData.email}</p>
      <p><strong>Mobile:</strong> ${formData.mobile}</p>
      <p><strong>Preferred Mode:</strong> ${formData.preferredMode}</p>
    `;

    // Add fields specific to registration type
    if (registrationType === "parent") {
      detailsHtml += `
        <p><strong>Relationship to Student:</strong> ${formData.relationship}</p>
      `;
    } else {
      detailsHtml += `
        <p><strong>Date of Birth:</strong> ${formData.dateOfBirth}</p>
        <p><strong>Gender:</strong> ${formData.gender}</p>
        <p><strong>Educational Status:</strong> ${educationalStatus}</p>
        <p><strong>Institution Name:</strong> ${formData.institutionName}</p>
        <p><strong>Year of Study:</strong> ${formData.yearOfStudy}</p>
        <p><strong>Previous Workshop:</strong> ${formData.previousWorkshop}</p>
        <p><strong>Reason for Joining:</strong> ${formData.reasonForJoining}</p>
        <p><strong>Heard About Us From:</strong> ${formData.hearAboutUs}</p>
      `;
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: `New Registration: ${formData.fullName} (${registrationId})${
        workshopName ? ` - ${workshopName}` : " - TiSAT"
      }`,
      html: detailsHtml,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
