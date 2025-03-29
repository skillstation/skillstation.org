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

// Workshop data for the component
const workshopData = [
  {
    id: 1,
    title: "AskIITian: Learn What it Takes to be an IITian",
    type: "Workshop",
    location: "HIVE, VR Mall, Chennai",
    duration: "1 Day",
    description:
      "Get insights from IITians about their journey and learn what it takes to crack IIT.",
    image: "workshop1.jpg",
    isHighlight: true,
  },
  {
    id: 2,
    title: "CodeQuest: Workshop & Hackathon",
    type: "Workshop, Hackathon",
    location: "IIT Madras",
    duration: "2 Days",
    description:
      "Join us for an exciting coding workshop followed by a hackathon challenge.",
    image: "workshop2.jpg",
  },
  {
    id: 3,
    title: "Choosing the Right Career Path",
    type: "Workshop",
    location: "HIVE, VR Mall, Chennai",
    duration: "1 Day",
    description:
      "Career guidance program to help you make informed decisions about your future.",
    image: "workshop3.jpg",
  },
  {
    id: 4,
    title: "Scientific Programming for Engineers",
    type: "7 day Bootcamp",
    location: "IIT Madras",
    duration: "7 Days",
    description:
      "Intensive bootcamp focused on scientific programming and engineering applications.",
    image: "workshop4.jpg",
  },
  {
    id: 5,
    title: "Programming for Web",
    type: "7 day Bootcamp",
    location: "IIT Madras",
    duration: "7 Days",
    description:
      "Comprehensive web development bootcamp covering modern technologies.",
    image: "workshop5.jpg",
  },
];

const Tisat = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
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

  const handleCardClick = (workshopName) => {
    const workshop =
      workshopData.find((w) => w.title.includes(workshopName)) ||
      workshopData[0];
    setSelectedWorkshop(workshop);
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm md:text-base cursor-pointer">
              Apply for TiSAT
            </button>
          </div>
        </div>
      </div>

      {/* Proper spacing for mobile content */}
      <div className=" ">
        {/* Mobile View (Only shows when screen is small) */}
        <div className="md:hidden">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Our Workshops
            </h1>

            {/* Mobile Workshop Cards */}
            <div className="space-y-4">
              {/* AskIITian Mobile Card */}
              <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="bg-blue-50 p-2 rounded-lg mr-3">
                    <FaGraduationCap className="text-xl text-blue-600" />
                  </div>
                  <span className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded-full">
                    Workshop
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-1">AskIITian</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Learn What it Takes to be an IITian
                </p>
                <div className="text-sm text-gray-500">
                  <p className="flex items-center mb-1">
                    <FaMapMarkerAlt className="mr-2" /> HIVE, VR Mall, Chennai
                  </p>
                  <p className="flex items-center">
                    <FaCalendar className="mr-2" /> 12.04.2025
                  </p>
                </div>
                <button
                  onClick={() => handleCardClick("AskIITian")}
                  className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
                >
                  Register Now
                </button>
              </div>

              {/* Other Workshop Mobile Cards */}
              {["CodeQuest", "Career Guidance", "Scientific Programming"].map(
                (workshop) => (
                  <div
                    key={workshop}
                    className="bg-white rounded-lg p-4 shadow-md border border-gray-100"
                  >
                    <div className="flex items-center mb-3">
                      {workshop === "CodeQuest" && (
                        <div className="bg-purple-50 p-2 rounded-lg mr-3">
                          <FaLaptopCode className="text-xl text-purple-600" />
                        </div>
                      )}
                      {workshop === "Career Guidance" && (
                        <div className="bg-indigo-50 p-2 rounded-lg mr-3">
                          <FaLightbulb className="text-xl text-indigo-600" />
                        </div>
                      )}
                      {workshop === "Scientific Programming" && (
                        <div className="bg-blue-50 p-2 rounded-lg mr-3">
                          <FaCode className="text-xl text-blue-600" />
                        </div>
                      )}
                      <span className="bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{workshop}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {workshop === "CodeQuest" && "Workshop & Hackathon"}
                      {workshop === "Career Guidance" &&
                        "Choose the Right Career Path"}
                      {workshop === "Scientific Programming" && "For Engineers"}
                    </p>
                    <div className="text-sm text-gray-500">
                      <p className="flex items-center mb-1">
                        <FaMapMarkerAlt className="mr-2" />
                        {workshop === "Career Guidance"
                          ? "HIVE, VR Mall, Chennai"
                          : "IIT Madras"}
                      </p>
                      <p className="flex items-center">
                        <FaCalendar className="mr-2" /> Coming Soon
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop View (Hidden on mobile) */}
      <div className="hidden md:block">
        {/* Your existing desktop layout code */}
        <div className="relative">
          {/* Enhanced Blue Background with Gradient */}
          <div className="bg-gradient-to-br from-[#0041F5] to-[#0066FF] w-full h-[500px] relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Replace city selector with motivational quote section */}
            <div className="max-w-7xl mx-auto px-4 pt-12">
              <div className="text-center text-white space-y-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight px-4">
                  Your Journey to Success
                  <br />
                  Begins with a Single Step
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto px-4">
                  Whether you're in 11th grade dreaming of IIT or a college
                  student aiming for excellence, we're here to guide your path
                  to success.
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced White Rectangle Container */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl">
            <div className="mx-4 bg-white rounded-2xl shadow-2xl p-8 backdrop-blur-lg border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {/* AskIITian Card */}
                <div
                  className="group bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden"
                  onClick={() => handleCardClick("AskIITian")}
                >
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaGraduationCap className="text-3xl text-blue-600 group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="text-md text-blue-600 font-semibold bg-blue-50 px-2 py-1 rounded-full mb-2 inline-block">
                    Workshop
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    AskIITian
                  </h3>
                  <p className="text-md text-gray-500">
                    Learn What it Takes to be an IITian
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    HIVE, VR Mall, Chennai
                  </p>
                  <p className="text-sm text-gray-400 mt-2">Date: 12.04.2025</p>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transform transition-transform duration-300 hover:scale-105">
                      Register Here
                    </button>
                  </div>
                </div>

                {/* CodeQuest Card */}
                <div className="group bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaLaptopCode className="text-3xl text-purple-600 group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="text-md text-purple-600 font-semibold bg-purple-50 px-2 py-1 rounded-full mb-2 inline-block">
                    Workshop, Hackathon
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    CodeQuest
                  </h3>
                  <p className="text-md text-gray-500">Workshop & Hackathon</p>
                  <p className="text-xm text-gray-400 mt-2">IIT Madras</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Date: coming soon
                  </p>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xl font-bold">
                      Coming Soon
                    </span>
                    <span className="text-white/80 text-sm mt-2">
                      Stay Tuned!
                    </span>
                  </div>
                </div>

                {/* Career Guidance Card */}
                <div className="group bg-white rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 w-20 h-20 rounded-2xl flex items-center justify-center  mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FaLightbulb className="text-3xl text-indigo-600 group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="text-md text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded-full mb-2 inline-block">
                    Workshop
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    Career Guidance
                  </h3>
                  <p className="text-md text-gray-500">
                    Choose the Right Career Path
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    HIVE, VR Mall, Chennai
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Date: coming soon
                  </p>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xl font-bold">
                      Coming Soon
                    </span>
                    <span className="text-white/80 text-sm mt-2">
                      Stay Tuned!
                    </span>
                  </div>
                </div>

                {/* Scientific Programming Card - Now in Blue */}
                <div className="group bg-gradient-to-br from-[#0041F5] to-[#0066FF] rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
                  <div className="bg-white/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 backdrop-blur-lg">
                    <FaCode className="text-3xl text-white group-hover:rotate-12 transition-transform" />
                  </div>
                  <span className="text-md text-white font-semibold bg-white/20 px-2 py-1 rounded-full mb-2 inline-block">
                    7 day Bootcamp
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Scientific Programming
                  </h3>
                  <p className="text-md text-white/80">For Engineers</p>
                  <p className="text-sm text-white/60 mt-2">IIT Madras</p>
                  <p className="text-sm text-white/60 mt-2">
                    Date: coming soon
                  </p>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white text-xl font-bold">
                      Coming Soon
                    </span>
                    <span className="text-white/80 text-sm mt-2">
                      Stay Tuned!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - Adjusting padding for both mobile and desktop */}
      <div className="max-w-7xl mx-auto px-4 pt-8 md:pt-96 lg:pt-72 text-gray-800">
        {/* Workshop Introduction */}
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">
            Upcoming Workshop: AskIITian Workshop
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
            Learn What it Takes to be an IITian - A comprehensive workshop
            designed to guide aspiring IITians on their journey to success.
          </p>
        </div>

        {/* Workshop Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mt-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Workshop Highlights
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Expert guidance from successful IITians
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Interactive problem-solving sessions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Study strategies and time management tips
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Personal mentoring opportunities
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Who Should Attend?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Students from Class XI and XII
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Aspiring IIT-JEE candidates
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Parents seeking guidance for their children
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">Workshop Details</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-center">
                  <span className="font-semibold w-24">Date:</span>
                  <span>12.04.2025</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-24">Venue:</span>
                  <span>HIVE, VR Mall, Chennai</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-24">Duration:</span>
                  <span>One Day Intensive Workshop</span>
                </div>
                <div className="flex items-center">
                  <span className="font-semibold w-24">Fee:</span>
                  <span>Rs. 500</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold mb-4">
                Registration Open!
              </h3>
              <p className="text-gray-600 mb-4">
                Limited seats available. Register now to secure your spot in
                this transformative workshop.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>

        {/* Note about other workshops */}
        <div className="mt-16 p-6 bg-gray-50 rounded-xl">
          <h3 className="text-2xl font-semibold mb-4">
            More Workshops Coming Soon
          </h3>
          <p className="text-gray-600">
            Stay tuned for our upcoming workshops including CodeQuest, Career
            Guidance Programme, Scientific Programming for Engineers, and
            Programming for Web. Subscribe to our newsletter to get notified
            when registrations open.
          </p>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6">
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-bold">
                  Register for {selectedWorkshop?.title}
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                      I have read and agree to the Refund Policy, Privacy
                      Policy, and Terms & Conditions.
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
