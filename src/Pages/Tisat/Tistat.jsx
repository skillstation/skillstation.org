import React, { useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import {
  FaMapMarkerAlt,
  FaCalendar,
  FaGraduationCap,
  FaCode,
  FaLightbulb,
  FaLaptopCode,
} from "react-icons/fa";
import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  getDocs,
  orderBy,
  limit,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { sendRegistrationEmail } from "../../utils/api";

const Tisat = () => {
  const [showModal, setShowModal] = useState(false);
  const [registrationType, setRegistrationType] = useState("student");
  const [educationalStatus, setEducationalStatus] = useState("School");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dateOfBirth: "",
    gender: "",
    institutionName: "",
    yearOfStudy: "",
    preferredMode: "",
    previousWorkshop: "",
    reasonForJoining: "",
    hearAboutUs: "",
    relationship: "",
  });

  // Add state for checkboxes
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToPay, setAgreeToPay] = useState(false);
  const [parentConsent, setParentConsent] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const handleCardClick = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get today's date at midnight for comparison
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Query to get today's registrations
      const registrationsRef = collection(db, "Test");
      const todaysRegistrations = await getDocs(
        query(registrationsRef, orderBy("timestamp", "desc"), limit(1))
      );

      // Generate registration ID
      let dayCode = "Z"; // Start with Z
      let sequenceNumber = 1;

      if (!todaysRegistrations.empty) {
        const lastRegistration = todaysRegistrations.docs[0].data();
        const lastRegId = lastRegistration.registrationId || "Z000";

        // Extract the day code and sequence number
        const currentDayCode = lastRegId.charAt(0);
        const currentSequence = parseInt(lastRegId.substring(1));

        if (currentSequence < 999) {
          // Continue with the same day code, increment sequence
          dayCode = currentDayCode;
          sequenceNumber = currentSequence + 1;
        } else {
          // Move to next letter (backwards in alphabet)
          dayCode = String.fromCharCode(currentDayCode.charCodeAt(0) - 1);
          sequenceNumber = 1;

          // Check if we've reached 'A'
          if (dayCode < "A") {
            throw new Error("Maximum registration limit reached");
          }
        }
      }

      // Format the registration ID
      const generatedId = `${dayCode}${String(sequenceNumber).padStart(
        3,
        "0"
      )}`;

      // Create registration data
      const registrationData = {
        registrationId: generatedId,
        timestamp: serverTimestamp(),
        UserType: registrationType,
        FullName: formData.fullName,
        Email: formData.email,
        Mobile: formData.mobile,
        PreferredMode: formData.preferredMode,
        "agree to pay Rs. 500": agreeToPay,
        "agree to terms": agreeToTerms,
        status: "Waitlisted",
      };

      // Add type-specific fields
      if (registrationType === "parent") {
        registrationData.RelationshipToStudent = formData.relationship;
        registrationData.ParentConsent = parentConsent;
      } else {
        registrationData.DateOfBirth = formData.dateOfBirth;
        registrationData.Gender = formData.gender;
        registrationData.EducationalStatus = educationalStatus;
        registrationData.InstitutionName = formData.institutionName;
        registrationData.YearOfStudy = formData.yearOfStudy;
        registrationData.PreviousWorkshop = formData.previousWorkshop;
        registrationData.ReasonForJoining = formData.reasonForJoining;
        registrationData.HearAboutUs = formData.hearAboutUs;
      }

      // Save to Firebase
      const docRef = await addDoc(collection(db, "Test"), registrationData);
      console.log("Registration successful with ID: ", docRef.id);

      // Create notification for email alerts
      const notificationData = {
        registrationId: generatedId,
        timestamp: serverTimestamp(),
        UserType: registrationType,
        FullName: formData.fullName,
        Email: formData.email,
        Mobile: formData.mobile,
        status: "Waitlisted",
        isEmailSent: false, // Flag to check if email has been sent
        targetEmail: "code.ie7engineer@gmail.com", // The email to send notification to
      };

      // Save notification to a separate collection for email processing
      await addDoc(collection(db, "NotificationsQueue"), notificationData);
      console.log("Notification queued for email processing");

      // Send email using our Nodemailer server
      try {
        const emailResponse = await sendRegistrationEmail({
          formData,
          registrationType,
          registrationId: generatedId,
          educationalStatus,
        });
        console.log("Email sent successfully:", emailResponse);
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Don't throw here to ensure registration process continues
      }

      // Set registration ID and show success dialog
      setRegistrationId(generatedId);
      setShowSuccessDialog(true);

      // Close registration modal and reset form
      setShowModal(false);
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        dateOfBirth: "",
        gender: "",
        institutionName: "",
        yearOfStudy: "",
        preferredMode: "",
        previousWorkshop: "",
        reasonForJoining: "",
        hearAboutUs: "",
        relationship: "",
      });
      setAgreeToPay(false);
      setAgreeToTerms(false);
      setParentConsent(false);
    } catch (error) {
      console.error("Error details:", error);
      if (error.message === "Maximum registration limit reached") {
        alert(
          "Registration limit reached for today. Please try again tomorrow."
        );
      } else if (error.code === "permission-denied") {
        alert("Database access error. Please contact support.");
      } else {
        alert("Error registering. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[80px]">
      <Navbar />

      {/* TiSAT Header - Making mobile responsive */}
      <div className="bg-gradient-to-br from-[#000000] to-[#0c1118] w-full relative overflow-hidden flex items-center justify-center py-8 px-4">
        <div className="text-center">
          <h1 className="md:text-4xl text-2xl font-bold text-white mb-2 md:mb-4">
            TiSAT-2025
          </h1>
          <p className="text-white text-base md:text-xl mb-4">
            Talent Insight and Skill Assessment Test
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm md:text-base cursor-pointer">
              Download Official Circular
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm md:text-base cursor-pointer">
              Download Program Brochure
            </button>
            <button
              onClick={() => handleCardClick()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm md:text-base cursor-pointer"
            >
              Apply for TiSAT
            </button>
          </div>
        </div>
      </div>

      {/* Main content area - Adjusting padding for both mobile and desktop */}
      <div className="max-w-7xl mx-auto px-4 pt-8 text-gray-800">
        {/* About TiSAT-2025 */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
          <div className="bg-blue-600 p-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              About TiSAT-2025
            </h2>
          </div>
          <div className="p-4 md:p-6">
            <p className="text-gray-600">
              The TiSAT (Talent Insight and Skill Assessment Test) 2025 is an
              initiative by Skill Station Academy aimed at identifying and
              nurturing young scientists, engineers, and technologists. Through
              this program, students gain access to mentorship, resources, and a
              platform to showcase their passion for science and technology.
              Additionally, they are mentored to prepare for IITJEE to join IIT
              and pursue education in the field of science and engineering.
            </p>
          </div>
        </div>

        {/* Young Scientist Fellowship Program */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
          <div className="bg-blue-600 p-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Young Scientist Fellowship Program
            </h2>
          </div>
          <div className="p-4 md:p-6">
            <p className="text-gray-600">
              The Young Scientist Fellowship Program provides mentorship,
              funding, and resources to cultivate the curiosity and interest to
              learn science and mathematics in an interesting and engaging way
              directly from IIT alumni and students. Selected students will be
              given opportunities to pursue other skill development courses
              relevant to industry needs, taught by professional experts.
            </p>
          </div>
        </div>

        {/* Our Approach - New Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <FaGraduationCap className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold">Expert Mentorship</h3>
            </div>
            <p className="text-gray-600">
              Learn directly from IIT alumni and industry professionals who
              guide you through your educational journey.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <FaLightbulb className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold">Innovative Learning</h3>
            </div>
            <p className="text-gray-600">
              Experience science and mathematics through engaging, interactive
              methods that make complex concepts easy to understand.
            </p>
          </div>

          <div className="bg-white p-5 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <FaLaptopCode className="text-blue-600 text-xl" />
              </div>
              <h3 className="text-lg font-bold">Skill Development</h3>
            </div>
            <p className="text-gray-600">
              Gain practical skills relevant to industry needs through
              specialized courses and hands-on projects.
            </p>
          </div>
        </div>

        {/* Important Dates */}
        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
          <div className="bg-blue-600 p-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Important Dates
            </h2>
          </div>
          <div className="p-4 md:p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-gray-800 font-semibold">Event</th>
                  <th className="p-3 text-gray-800 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3 flex items-center">
                    <FaCalendar className="text-blue-600 mr-2" />
                    Application Start Date
                  </td>
                  <td className="p-3 text-blue-600 font-medium">
                    Will be shared via email
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 flex items-center">
                    <FaCalendar className="text-blue-600 mr-2" />
                    Application Deadline
                  </td>
                  <td className="p-3 text-blue-600 font-medium">
                    Will be shared via email
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-3 flex items-center">
                    <FaCalendar className="text-blue-600 mr-2" />
                    Results Announcement
                  </td>
                  <td className="p-3 text-blue-600 font-medium">
                    Will be shared via email
                  </td>
                </tr>
                <tr>
                  <td className="p-3 flex items-center">
                    <FaCalendar className="text-blue-600 mr-2" />
                    Classes Commence
                  </td>
                  <td className="p-3 text-blue-600 font-medium">
                    Will be shared via email
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-600 rounded-lg p-6 text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-white mb-5 max-w-3xl mx-auto">
            Join TiSAT-2025 and embark on a transformative educational
            experience with guidance from IIT mentors.
          </p>
          <button
            onClick={() => handleCardClick()}
            className="bg-white text-blue-600 hover:bg-gray-100 font-medium px-6 py-2 rounded-lg transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold">
                  Register for TiSAT Exam
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              {/* Registration Type Toggle */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-6 md:mb-8">
                <button
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    registrationType === "parent"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setRegistrationType("parent")}
                >
                  Register as Parent
                </button>
                <button
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                    registrationType === "student"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  onClick={() => setRegistrationType("student")}
                >
                  Register as Student
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {registrationType === "parent" ? (
                  /* Parent Registration Form */
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Parent/Guardian Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Relationship to Student
                        </label>
                        <select
                          name="relationship"
                          value={formData.relationship}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        >
                          <option value="Parent">Parent</option>
                          <option value="Guardian">Guardian</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Preferred Communication Mode
                        </label>
                        <select
                          name="preferredMode"
                          value={formData.preferredMode}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        >
                          <option value="Call">Call</option>
                          <option value="Email">Email</option>
                          <option value="WhatsApp">WhatsApp</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Student Registration Form */
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Student Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Gender
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Mobile Number
                        </label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Educational Status
                        </label>
                        <select
                          name="educationalStatus"
                          value={educationalStatus}
                          onChange={(e) => setEducationalStatus(e.target.value)}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        >
                          <option value="School">School Student</option>
                          <option value="College">College Student</option>
                          <option value="Working">Working Professional</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Institution Name
                        </label>
                        <input
                          type="text"
                          name="institutionName"
                          value={formData.institutionName}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Year of Study
                        </label>
                        <select
                          name="yearOfStudy"
                          value={formData.yearOfStudy}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        >
                          {educationalStatus === "School" ? (
                            <>
                              <option value="IX">Class IX</option>
                              <option value="X">Class X</option>
                              <option value="XI">Class XI</option>
                              <option value="XII">Class XII</option>
                            </>
                          ) : (
                            <>
                              <option value="1">B.E/B.Tech 1st Year</option>
                              <option value="2">B.E/B.Tech 2nd Year</option>
                              <option value="3">B.E/B.Tech 3rd Year</option>
                              <option value="4">B.E/B.Tech 4th Year</option>
                              <option value="other">Other</option>
                            </>
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Preferred Mode
                        </label>
                        <select
                          name="preferredMode"
                          value={formData.preferredMode}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        >
                          <option value="Online">Online</option>
                          <option value="Offline">Offline</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Previous Workshop Participation
                        </label>
                        <select
                          name="previousWorkshop"
                          value={formData.previousWorkshop}
                          onChange={handleInputChange}
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                          required
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Reason for Joining
                      </label>
                      <textarea
                        name="reasonForJoining"
                        value={formData.reasonForJoining}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                        rows="3"
                        required
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        How did you hear about this workshop?
                      </label>
                      <select
                        name="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={handleInputChange}
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-4 py-3"
                        required
                      >
                        <option value="Social Media">Social Media</option>
                        <option value="Friends">Friends</option>
                        <option value="School/College">School/College</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Common Section */}
                <div className="space-y-4 border-t pt-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreeToPay}
                      onChange={(e) => setAgreeToPay(e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <span className="ml-2 block text-sm text-gray-700">
                      I agree to pay Rs. 500 for the workshop registration fee;
                      otherwise, I acknowledge that my participation may be
                      waitlisted.
                    </span>
                  </div>
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <span className="ml-2 block text-sm text-gray-700">
                      I have read and agree to the{" "}
                      <Link
                        to="/refund"
                        className="text-blue-600 hover:underline"
                      >
                        Refund Policy
                      </Link>
                      ,{" "}
                      <Link
                        to="/privacy"
                        className="text-blue-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      , and{" "}
                      <Link
                        to="/terms-and-conditions"
                        className="text-blue-600 hover:underline"
                      >
                        Terms & Conditions
                      </Link>
                      .
                    </span>
                  </div>
                </div>

                {/* Parent consent checkbox (only show for parent registration) */}
                {registrationType === "parent" && (
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      checked={parentConsent}
                      onChange={(e) => setParentConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <span className="ml-2 block text-sm text-gray-700">
                      I give my consent for my child to participate in this
                      workshop.
                    </span>
                  </div>
                )}

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting ? "Registering..." : "Register Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Interest Received!</h2>
            <p className="text-lg font-semibold mb-2">
              Your Registration ID: {registrationId}
            </p>
            <p className="text-gray-600 mb-6">Status: Waitlisted</p>
            <p className="text-gray-600 mb-6">
              Check your email and WhatsApp for workshop details.
            </p>
            <button
              onClick={() => setShowSuccessDialog(false)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Tisat;
