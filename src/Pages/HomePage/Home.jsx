import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Hero1 from "../../assets/1.png";
import Hero2 from "../../assets/2.png";
import Hero3 from "../../assets/3.png";
import Hero4 from "../../assets/4.png";
import mentor1 from "../../assets/mentor1.jpg";
import Footer from "../../Components/Footer/Footer";
import sai from "../../assets/sai.jpg";
import elankovan from "../../assets/elankovan.jpeg";
import sudha from "../../assets/sudha.jpg";
import Marquee from "../../Components/Marquee/Marquee";
import Popup from "../../Components/Popup/Popup";
import { Link } from "react-router-dom";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      question: "What inspired the creation of Skill Station Academy?",
      answer: [
        "Skill Station Academy was founded with a vision to make quality education and skill development accessible to all. Established by IITians and supported by student volunteers from Yale-NUS, UBC, Stanford, and MIT, the academy aims to bridge the gap between traditional education and industry needs. We focus on STEM education, competitive exam preparation, and skill training to empower young minds with problem-solving abilities and real-world applications.",
      ],
    },
    {
      question: "Why is Skill Station Academy a non-profit?",
      answer: [
        "We believe education should be a fundamental right, not a privilege. As a non-profit, our goal is to provide high-quality learning opportunities without financial barriers. We offer free educational resources, mentorship programs, and tuition fee waivers to deserving students, ensuring that talented individuals, regardless of their economic background, have the opportunity to excel.",
      ],
    },
    {
      question:
        "How does Skill Station Academy contribute to education and skill development?",
      answer: [
        "Skill Station Academy integrates rigorous academic training with hands-on skill development. We offer IIT-JEE and GATE coaching, coding bootcamps, and problem-solving courses designed by industry leaders. Through our mentorship programs and workshops, students gain practical exposure, critical thinking abilities, and career guidance, preparing them for future challenges.",
      ],
    },
    {
      question: "Why are all the courses invite-only at Skill Station?",
      answer: [
        "Our invite-only model is designed to maintain high educational standards and provide a focused, personalized learning experience. Students are selected based on rigorous criteria, including TiSAT (our IQ-based assessment) for JEE Mentorship, hands-on coding evaluations for programming courses, interviews, and faculty recommendations.",
        "This ensures that only deserving and highly committed students are onboarded. By carefully selecting our learners, we can offer tailored mentorship, structured learning, and specialized coaching, giving them the best possible chance to succeed.",
      ],
    },
    {
      question: "What is TiSAT?",
      answer: [
        "TiSAT (Talent Insight and Skill Assessment Test) is our specialized IQ-based assessment designed to identify students with a strong aptitude for problem-solving. Using Wechsler international testing methods, TiSAT helps us select and onboard students who demonstrate a natural inclination toward STEM and analytical thinking. This ensures that only the most motivated and capable learners receive mentorship and structured training for IIT-JEE preparation.",
      ],
    },
    {
      question: "What is the purpose of the 'AskIITian Workshop'?",
      answer: [
        "The AskIITian Workshop is designed to connect IIT-JEE aspirants with IIT alumni, IIT Students and expert mentors. It provides students with insights into IIT-JEE preparation, effective study strategies, and problem-solving techniques. The workshop also helps students navigate the challenges of competitive exams through real-life experiences and expert advice.",
      ],
    },
    {
      question:
        "Does Skill Station Academy offer a regular coaching program for IIT-JEE?",
      answer: [
        "No, we do not offer conventional coaching programs. Instead, we focus on specialized mentorship-driven learning. Our IIT-JEE Academy provides structured guidance, problem-solving sessions, and tailored study plans to help students master concepts effectively rather than just following a traditional classroom format.",
      ],
    },
    {
      question:
        "What is unique about the IIT-JEE Mentorship Programme offered by Skill Station's IIT-JEE Academy?",
      answer: [
        "Our IIT-JEE Mentorship Programme is uniquely designed to provide a highly personalized learning experience. Students receive one-on-one mentorship from IITians, access to top-tier study materials, and engagement in interactive problem-solving sessions.",
        "Emphasizing deep conceptual understanding, analytical thinking, and practical application over rote memorization, our program equips students with the skills needed to excel. With our structured guidance and mentorship, students significantly enhance their chances of successfully cracking the JEE.",
      ],
    },
    {
      question:
        "I am an IIT-JEE aspirant. Can I connect with mentors from IIT?",
      answer: [
        "Yes! We offer direct mentorship from IIT graduates who guide students through their IIT-JEE preparation. Our mentors provide study strategies, doubt-solving sessions, and motivation to help students stay on track and perform at their best.",
      ],
    },
    {
      question: "Do you offer a mentorship programme for GATE?",
      answer: [
        "Yes, we offer a dedicated GATE mentorship program for engineering graduates. Designed by experts, our program provides structured learning, in-depth subject coverage, and problem-solving strategies to help students excel in the GATE examination.",
      ],
    },
    {
      question:
        "As a parent, I'm unsure about figuring out my child's career path. What should I do?",
      answer: [
        "We understand that choosing the right career path can be overwhelming. Skill Station Academy offers career guidance through workshops, one-on-one counseling sessions, and aptitude-based assessments like TiSAT. Our experts help parents and students explore different career options, understand strengths, and make informed decisions.",
      ],
    },
  ];

  const slides = [
    {
      image: Hero1,
      title: "Excel in STEM & Competitive Exams",
      subtitle: "Unlock Your Potential with Expert Mentorship",
      description:
        "Join our IIT-JEE and GATE coaching programs to achieve academic excellence.",
    },
    {
      image: Hero2,
      title: "Enhance Your Coding & Problem-Solving Skills",
      subtitle: "Master Algorithmic Thinking",
      description:
        "Develop strong computational skills with our interactive programming courses.",
    },
    {
      image: Hero1,
      title: "Scholarships & Open-Source Learning",
      subtitle: "Education for Every Deserving Student",
      description:
        "Access free resources and mentorship with our full tuition fee waiver programs.",
    },
    {
      image: Hero4,
      title: "Sharpen Your Analytical & Logical Reasoning",
      subtitle: "TiSAT: Talent Insight & Skill Assessment Test",
      description:
        "Identify and nurture your problem-solving aptitude with our international IQ-based assessment.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    const popupTimer = setTimeout(() => {
      setIsPopupOpen(true);
    }, 5000); // 5 seconds delay

    return () => {
      clearInterval(timer);
      clearTimeout(popupTimer);
    };
  }, []);

  return (
    <>
      <div className="fixed  p-20 z-100 w-full ">
        <Navbar />
      </div>
      <div className="relative min-h-screen  pt-[40px]">
        {/* Hero Carousel */}
        <div className="relative h-screen w-full overflow-hidden mt-[40px]">
          {/* Slides */}
          <div className="relative h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
                  currentSlide === index ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  />
                  {/* Multiple layers of overlay for better text visibility */}
                  <div className="absolute inset-0 bg-black/0"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-black/30"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 flex h-full items-center justify-center mx-auto max-w-7xl px-4">
                  <div className="container mx-auto ">
                    <div className="max-w-4xl">
                      {" "}
                      {/* Increased max width for slide title */}
                      <h1 className=" text-3xl md:text-5xl font-bold text-white drop-shadow-lg tracking-tight">
                        {slide.title}
                      </h1>
                      <h3 className="mb-4 text-2xl md:text-4xl font-bold text-white drop-shadow-lg tracking-tight">
                        {slide.subtitle}
                      </h3>
                      <p className="mb-8 text-lg md:text-xl text-gray-200 drop-shadow font-light">
                        {slide.description}
                      </p>
                      {/* City Selector and CTA */}
                      <div className="flex ">
                        <Link
                          to="https://wa.me/+917305959397"
                          className="bg-[#0A57FF] cursor-pointer text-white px-4 py-2 rounded-md text-lg font-bold hover:bg-[#0041F5] transition-colors"
                        >
                          Start Your Journey Today
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Dots */}
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-3 w-3 rounded-full transition ${
                  currentSlide === index
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
        {/* About us section */}
        <section
          className="py-24 bg-gradient-to-b from-white to-gray-50"
          id="about-section"
        >
          <div className="container mx-auto px-4 md:px-8">
            {/* Header */}
            <div className="max-w-7xl mx-auto text-center mb-20">
              <span className="text-blue-600 font-semibold text-lg mb-2 block">
                Who We Are
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About <span className="text-blue-600">Skill Station</span>
              </h1>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
              <p className="md:text-xl text-gray-600 leading-relaxed">
                Skill Station is a next-generation international academy—a
                non-profit educational, research, and skill training
                institution—dedicated to STEM education, skill development, and
                competitive exam preparation. Founded by IITians from India,
                with contributions from student volunteers at Yale-NUS, UBC,
                Stanford, and MIT, we are committed to empowering young leaders
                through high-quality education that is both affordable and
                accessible to deserving students.
              </p>
            </div>

            {/* Section Header with Wavy Design */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <h1 className="text-2xl text-gray-400 uppercase tracking-wider font-medium">
                Our Expertise
              </h1>
            </div>
            {/* Features Grid */}
            <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-20">
              {/* IIT-JEE Excellence */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#9747FF] to-[#FF3C8C] p-8 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="absolute top-2 right-2 text-white/80 text-sm font-medium">
                  IIT-JEE
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Comprehensive IIT-JEE Mentorship by IITians
                  </h3>
                  <div className="mt-8 inline-flex items-center justify-center bg-white/20 rounded-full w-12 h-12">
                    <i className="fas fa-arrow-right text-white"></i>
                  </div>
                </div>
              </div>

              {/* GATE Excellence */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#005B41] to-[#00FF94] p-8 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="absolute top-2 right-2 text-white/80 text-sm font-medium">
                  GATE
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Expert GATE Coaching with Structured Learning Path
                  </h3>
                  <div className="mt-8 inline-flex items-center justify-center bg-white/20 rounded-full w-12 h-12">
                    <i className="fas fa-arrow-right text-white"></i>
                  </div>
                </div>
              </div>

              {/* Programming Skills */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#B4161B] to-[#2827CC] p-8 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="absolute top-2 right-2 text-white/80 text-sm font-medium">
                  Programming
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Advanced Programming & AI Technology Training
                  </h3>
                  <div className="mt-8 inline-flex items-center justify-center bg-white/20 rounded-full w-12 h-12">
                    <i className="fas fa-arrow-right text-white"></i>
                  </div>
                </div>
              </div>

              {/* TiSAT Assessment */}
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0000FF] to-[#00FFE0] p-8 hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="absolute top-2 right-2 text-white/80 text-sm font-medium">
                  Assessment
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-white mb-3">
                    TiSAT: Talent Insight & Skill Assessment Test
                  </h3>
                  <div className="mt-8 inline-flex items-center justify-center bg-white/20 rounded-full w-12 h-12">
                    <i className="fas fa-arrow-right text-white"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Course Overview Section */}
        <section className="relative bg-gradient-to-br from-gray-900 to-black py-12 md:py-24 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.8),rgba(0,0,0,1))]"></div>
            <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Header with Animation */}
            <div className="text-center mb-12 md:mb-20" data-aos="fade-up">
              <span className="inline-block text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2 bg-blue-400/10 px-4 py-1 rounded-full">
                Our Programs
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
                Comprehensive Learning Programs
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
                Discover our specialized courses designed to help you excel in
                your chosen field
              </p>
            </div>

            {/* All Courses Grid */}
            <div className="grid gap-6 md:gap-8 max-w-7xl mx-auto">
              {/* IIT-JEE Mentorship */}
              <div className="group relative">
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl transform transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/50">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="text-blue-400 p-3 md:p-4 bg-blue-400/10 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-400/20">
                      <i className="fas fa-graduation-cap text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                      IIT-JEE Mentorship Programme
                    </h3>
                  </div>

                  {/* Course Content with Better Typography */}
                  <div className="space-y-4 md:space-y-6 text-gray-300">
                    <div className="relative">
                      <div className="md:line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          The IIT-JEE Mentorship Programme at Skill Station is a
                          highly personalized coaching initiative designed to
                          help students excel in one of India's toughest
                          entrance exams. Mentored by IITians, this program
                          emphasizes deep conceptual understanding,
                          problem-solving techniques, and strategic preparation.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Students receive one-on-one guidance, curated study
                          materials, and participate in interactive
                          doubt-clearing sessions. Our approach goes beyond
                          traditional learning by focusing on analytical
                          thinking, real-world applications, and test-taking
                          strategies.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          With structured mentorship, rigorous practice tests,
                          and continuous progress tracking, we ensure that
                          students gain the confidence and skills needed to
                          crack JEE Advanced and JEE Mains.
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden transition-all duration-300 md:block hidden"></div>
                    </div>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              </div>

              {/* Classroom Test Series for IIT-JEE */}
              <div className="group relative">
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-2xl transform transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-red-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/50">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="text-orange-400 p-3 md:p-4 bg-orange-400/10 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-orange-400/20">
                      <i className="fas fa-tasks text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">
                      Classroom Test Series for IIT-JEE Aspirants
                    </h3>
                  </div>

                  {/* Course Content with Better Typography */}
                  <div className="space-y-4 md:space-y-6 text-gray-300">
                    <div className="relative">
                      <div className="md:line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Our Classroom Test Series for IIT-JEE Aspirants is
                          designed to simulate the real JEE examination
                          experience. With a meticulously crafted series of
                          topic-wise, full-length, and mock tests, students can
                          assess their preparation, identify weak areas, and
                          refine their problem-solving approach.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Each test is followed by in-depth performance analysis
                          and expert feedback, enabling students to improve
                          continuously. The test series is structured to match
                          JEE's evolving exam pattern, ensuring students develop
                          the speed, accuracy, and confidence required to excel.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          This program is ideal for aspirants looking to
                          strengthen their exam readiness and maximize their
                          scoring potential.
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden transition-all duration-300 md:block hidden"></div>
                    </div>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              </div>

              {/* GATE Mentorship */}
              <div className="group relative">
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl transform transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-emerald-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/50">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="text-green-400 p-3 md:p-4 bg-green-400/10 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-green-400/20">
                      <i className="fas fa-chart-line text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                      GATE Mentorship Programme
                    </h3>
                  </div>

                  {/* Course Content with Better Typography */}
                  <div className="space-y-4 md:space-y-6 text-gray-300">
                    <div className="relative">
                      <div className="md:line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          The GATE Mentorship Programme at Skill Station
                          provides a structured learning path for students
                          aiming to qualify for the Graduate Aptitude Test in
                          Engineering (GATE). Guided by experienced faculty and
                          GATE toppers, this program covers core engineering
                          concepts, problem-solving methodologies, and
                          time-management strategies.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Students benefit from personalized mentorship,
                          topic-wise tests, and hands-on guidance to tackle
                          complex numerical problems efficiently. With a focus
                          on conceptual depth, strategic exam preparation, and
                          regular assessments, this program equips students with
                          the skills necessary to achieve top ranks and unlock
                          career opportunities in higher education and PSU
                          recruitment.
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden transition-all duration-300 md:block hidden"></div>
                    </div>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              </div>

              {/* GATE Test Series */}
              <div className="group relative">
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 rounded-2xl transform transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/5 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/50">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="text-cyan-400 p-3 md:p-4 bg-cyan-400/10 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-400/20">
                      <i className="fas fa-clipboard-check text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      Classroom Test Series for GATE Aspirants
                    </h3>
                  </div>

                  {/* Course Content with Better Typography */}
                  <div className="space-y-4 md:space-y-6 text-gray-300">
                    <div className="relative">
                      <div className="md:line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          The Classroom Test Series for GATE Aspirants is a
                          meticulously designed practice platform to help
                          students master the exam format. Covering all core
                          topics, the test series includes subject-wise
                          assessments, full-length mock exams, and detailed
                          performance analytics.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Each test is crafted to reflect actual GATE difficulty
                          levels, ensuring students build the confidence and
                          speed needed for the exam. Post-test discussions and
                          expert evaluations help aspirants strengthen their
                          weak areas and refine their answering strategies.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          This test series is ideal for those looking to gauge
                          their preparation level and improve their
                          problem-solving accuracy.
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden transition-all duration-300 md:block hidden"></div>
                    </div>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              </div>

              {/* Engineering Mathematics */}
              <div className="group relative">
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-pink-600/20 rounded-2xl transform transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/50">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="text-rose-400 p-3 md:p-4 bg-rose-400/10 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-rose-400/20">
                      <i className="fas fa-square-root-alt text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-rose-400 transition-colors duration-300">
                      Engineering Mathematics
                    </h3>
                  </div>

                  {/* Course Content with Better Typography */}
                  <div className="space-y-4 md:space-y-6 text-gray-300">
                    <div className="relative">
                      <div className="md:line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Engineering Mathematics forms the foundation for many
                          technical disciplines. This course provides a
                          comprehensive understanding of core mathematical
                          concepts used in engineering, including linear
                          algebra, calculus, differential equations, and
                          probability.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Designed for students preparing for competitive exams
                          and engineering applications, the curriculum focuses
                          on problem-solving techniques, theoretical
                          foundations, and real-world applications.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Taught by experienced faculty, the course integrates
                          conceptual learning with hands-on problem-solving to
                          build mathematical intuition and proficiency essential
                          for success in technical fields.
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden transition-all duration-300 md:block hidden"></div>
                    </div>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              </div>

              {/* Algorithmic Thinking */}
              <div className="group relative">
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-2xl transform transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/5 to-amber-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/50">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="text-yellow-400 p-3 md:p-4 bg-yellow-400/10 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-yellow-400/20">
                      <i className="fas fa-code text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                      Algorithmic Thinking: A Mathematical Approach to
                      Programming
                    </h3>
                  </div>

                  {/* Course Content with Better Typography */}
                  <div className="space-y-4 md:space-y-6 text-gray-300">
                    <div className="relative">
                      <div className="md:line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          This course bridges the gap between mathematics and
                          programming by developing algorithmic problem-solving
                          skills. Designed for students interested in
                          computational thinking, the curriculum covers
                          fundamental algorithms, mathematical logic, data
                          structures, and optimization techniques.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          With a focus on mathematical reasoning and programming
                          efficiency, participants will learn to construct
                          algorithms for real-world challenges.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          The course integrates hands-on coding exercises with
                          theoretical discussions, making it ideal for aspiring
                          programmers, engineers, and AI enthusiasts looking to
                          enhance their logical reasoning and coding abilities.
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden transition-all duration-300 md:block hidden"></div>
                    </div>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 to-amber-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              </div>

              {/* Software Development */}
              <div className="group relative">
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 rounded-2xl transform transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 to-violet-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/50">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="text-indigo-400 p-3 md:p-4 bg-indigo-400/10 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-400/20">
                      <i className="fas fa-laptop-code text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
                      Software Application Development
                    </h3>
                  </div>

                  {/* Course Content with Better Typography */}
                  <div className="space-y-4 md:space-y-6 text-gray-300">
                    <div className="relative">
                      <div className="md:line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          The Software Application Development course provides a
                          hands-on approach to building scalable and efficient
                          software solutions. Covering front-end and back-end
                          technologies, databases, and software architecture
                          principles, students gain practical experience in
                          full-stack development.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          The curriculum includes industry-relevant tools, agile
                          methodologies, and real-world projects to ensure
                          learners acquire job-ready skills.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Designed for aspiring developers and software
                          engineers, this course equips participants with the
                          expertise to design, develop, and deploy robust
                          software applications across various platforms.
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden transition-all duration-300 md:block hidden"></div>
                    </div>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              </div>

              {/* MATLAB */}
              <div className="group relative">
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/20 to-cyan-600/20 rounded-2xl transform transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 to-cyan-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/50">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="text-teal-400 p-3 md:p-4 bg-teal-400/10 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-400/20">
                      <i className="fas fa-calculator text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-teal-400 transition-colors duration-300">
                      MATLAB for Engineers & Scientists
                    </h3>
                  </div>

                  {/* Course Content with Better Typography */}
                  <div className="space-y-4 md:space-y-6 text-gray-300">
                    <div className="relative">
                      <div className="md:line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          MATLAB is a powerful tool for engineers and scientists
                          working with complex computations, simulations, and
                          data visualization. This course provides an in-depth
                          introduction to MATLAB programming, numerical
                          computing, and algorithm development.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Topics include matrix operations, signal processing,
                          statistical analysis, and machine learning
                          applications.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          With hands-on exercises and real-world case studies,
                          students learn to apply MATLAB for research,
                          engineering problem-solving, and industrial
                          applications. This course is ideal for engineers,
                          researchers, and professionals looking to enhance
                          their technical computing skills.
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden transition-all duration-300 md:block hidden"></div>
                    </div>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              </div>

              {/* Advanced Statistics */}
              <div className="group relative">
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 rounded-2xl transform transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/50">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="text-fuchsia-400 p-3 md:p-4 bg-fuchsia-400/10 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-fuchsia-400/20">
                      <i className="fas fa-brain text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-fuchsia-400 transition-colors duration-300">
                      Advanced Statistical Methods for Machine Learning & AI
                    </h3>
                  </div>

                  {/* Course Content with Better Typography */}
                  <div className="space-y-4 md:space-y-6 text-gray-300">
                    <div className="relative">
                      <div className="md:line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Data science and AI heavily rely on statistical
                          methods for model development and analysis. This
                          course delves into advanced statistical techniques,
                          including hypothesis testing, Bayesian inference,
                          regression models, and probabilistic machine learning
                          approaches.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Designed for AI enthusiasts, data scientists, and
                          researchers, the curriculum emphasizes real-world
                          applications, mathematical foundations, and hands-on
                          implementation using Python and R.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          By the end of the course, students will be equipped to
                          apply advanced statistical techniques to machine
                          learning and AI projects confidently.
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden transition-all duration-300 md:block hidden"></div>
                    </div>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              </div>

              {/* Behavioral Science */}
              <div className="group relative">
                {/* Card Background with Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600/20 to-pink-600/20 rounded-2xl transform transition-all duration-300 group-hover:scale-[1.02]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-rose-600/5 to-pink-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Card Content */}
                <div className="relative bg-gray-900/40 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-gray-800/50">
                  {/* Header with Icon */}
                  <div className="flex items-center gap-4 mb-6 md:mb-8">
                    <div className="text-rose-400 p-3 md:p-4 bg-rose-400/10 rounded-xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-rose-400/20">
                      <i className="fas fa-users text-xl md:text-2xl"></i>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-rose-400 transition-colors duration-300">
                      Behavioral Science: For Leaders
                    </h3>
                  </div>

                  {/* Course Content with Better Typography */}
                  <div className="space-y-4 md:space-y-6 text-gray-300">
                    <div className="relative">
                      <div className="md:line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Leadership is as much about understanding people as it
                          is about making decisions. This course explores the
                          science behind human behavior, decision-making, and
                          organizational dynamics.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Covering topics such as cognitive biases, motivation
                          theories, emotional intelligence, and behavioral
                          economics, the curriculum equips aspiring leaders with
                          the skills to influence, inspire, and manage
                          effectively.
                        </p>
                        <p className="leading-relaxed text-base md:text-lg transition-all duration-300 group-hover:text-gray-200">
                          Designed for professionals, entrepreneurs, and
                          students aspiring for leadership roles, this course
                          provides actionable insights into human psychology,
                          helping individuals develop a strategic and empathetic
                          approach to leadership.
                        </p>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-900 to-transparent group-hover:hidden transition-all duration-300 md:block hidden"></div>
                    </div>
                  </div>

                  {/* Hover Line Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Mentors Section */}
        <section
          id="mentors-section"
          className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-transparent blur-3xl animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-indigo-100/30 via-blue-100/20 to-transparent blur-3xl animate-pulse delay-700"></div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="flex items-center justify-center gap-4 mb-16">
                <h1 className="text-2xl text-gray-700 uppercase tracking-wider font-medium">
                  Our Expert Mentors
                </h1>
              </div>

              {/* Testimonial Cards */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Elankovan Gopal */}
                <div className="bg-white shadow-lg p-8 rounded-3xl relative group hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9747FF]/5 to-[#FF3C8C]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-32 h-32 mx-auto mb-6">
                      <div className="w-full h-full rounded-full border-2 border-[#9747FF] p-1">
                        <img
                          src={elankovan}
                          alt="Elankovan Gopal"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                      Elankovan Gopal
                    </h3>
                    <p className="text-gray-600 text-center text-sm mb-4">
                      Faculty Mentor, IIT Madras
                    </p>
                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#9747FF] to-[#FF3C8C] mx-auto mb-4"></div>
                  </div>
                </div>

                {/* Priyanka */}
                <div className="bg-white shadow-lg p-8 rounded-3xl relative group hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#005B41]/5 to-[#00FF94]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-32 h-32 mx-auto mb-6">
                      <div className="w-full h-full rounded-full border-2 border-[#00FF94] p-1">
                        <img
                          src={sudha}
                          alt="Priyanka"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                      Sudha Priyanka
                    </h3>
                    <p className="text-gray-600 text-center text-sm mb-4">
                      Faculty Mentor, IIT Madras
                    </p>
                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#005B41] to-[#00FF94] mx-auto mb-4"></div>
                  </div>
                </div>

                {/* Sai Likith */}
                <div className="bg-white shadow-lg p-8 rounded-3xl relative group hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B4161B]/5 to-[#2827CC]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-32 h-32 mx-auto mb-6">
                      <div className="w-full h-full rounded-full border-2 border-[#2827CC] p-1">
                        <img
                          src={sai}
                          alt="Sai Likith"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                      Sai Likith
                    </h3>
                    <p className="text-gray-600 text-center text-sm mb-4">
                      Student Mentor,IIT Madras
                    </p>
                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#B4161B] to-[#2827CC] mx-auto mb-4"></div>
                  </div>
                </div>

                <div className="bg-white shadow-lg p-8 rounded-3xl relative group hover:scale-105 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B4161B]/5 to-[#2827CC]/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative z-10">
                    <div className="w-32 h-32 mx-auto mb-6">
                      <div className="w-full h-full rounded-full border-2 border-[#2827CC] p-1">
                        <img
                          src="https://ui-avatars.com/api/?name=Ruthvik&background=random"
                          alt="Ruthvik"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
                      Ruthvik
                    </h3>
                    <p className="text-gray-600 text-center text-sm mb-4">
                      Student Mentor, IIT Madras
                    </p>
                    <div className="w-12 h-[2px] bg-gradient-to-r from-[#B4161B] to-[#2827CC] mx-auto mb-4"></div>
                  </div>
                </div>

                {/* Rutivik */}
                <div className="bg-white shadow-lg p-8 rounded-3xl relative group hover:scale-105 transition-all duration-300 md:col-span-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-blue-100/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="relative z-10 flex items-center justify-center h-full">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        More Expert Mentors
                      </h3>
                      <p className="text-gray-600">
                        Our growing team includes additional experts from IIT
                        Kharagpur and other premier institutions
                      </p>
                      <div className="mt-6 flex justify-center gap-4">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                        <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our learning centers */}
        <section className="md:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-transparent blur-3xl animate-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-indigo-100/30 via-blue-100/20 to-transparent blur-3xl animate-pulse delay-700"></div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-7xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <span className="text-blue-600 font-semibold text-lg mb-2 block">
                  Our Locations
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Learning Centers Across{" "}
                  <span className="text-blue-600">India</span>
                </h1>
                <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Join us at any of our state-of-the-art learning centers across
                  Chennai and Bangalore
                </p>
              </div>

              {/* Cities Grid */}
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                {/* Chennai */}
                <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <i className="fas fa-city text-blue-600 text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Chennai
                    </h3>
                  </div>
                  <div className="grid gap-6">
                    {/* Anna Nagar */}
                    <a
                      href="https://maps.app.goo.gl/AVfx4ccXXbinGaiH9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <i className="fas fa-map-marker-alt text-blue-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Anna Nagar
                          </h4>
                          <p className="text-sm text-gray-600">
                            Chennai, Tamil Nadu
                          </p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400 group-hover:text-blue-600 transition-colors"></i>
                    </a>

                    {/* Nanganallur */}
                    <a
                      href="https://maps.app.goo.gl/ECPBuWEpZ74ifLu48"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-purple-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                          <i className="fas fa-map-marker-alt text-purple-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                            Nanganallur
                          </h4>
                          <p className="text-sm text-gray-600">
                            Chennai, Tamil Nadu
                          </p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400 group-hover:text-purple-600 transition-colors"></i>
                    </a>

                    {/* Kolathur */}
                    <a
                      href="https://maps.app.goo.gl/SXfmgkvG3qRDfYxL9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                          <i className="fas fa-map-marker-alt text-indigo-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                            Kolathur
                          </h4>
                          <p className="text-sm text-gray-600">
                            Chennai, Tamil Nadu
                          </p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400 group-hover:text-indigo-600 transition-colors"></i>
                    </a>

                    {/* T. Nagar */}
                    <a
                      href="https://maps.app.goo.gl/wod3VNwSVewaZduHA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-cyan-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center group-hover:bg-cyan-200 transition-colors">
                          <i className="fas fa-map-marker-alt text-cyan-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-cyan-600 transition-colors">
                            T. Nagar
                          </h4>
                          <p className="text-sm text-gray-600">
                            Chennai, Tamil Nadu
                          </p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400 group-hover:text-cyan-600 transition-colors"></i>
                    </a>

                    {/* Tharamani */}
                    <a
                      href="https://maps.app.goo.gl/ULMnW1vzp4kcMZDf8"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-rose-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                          <i className="fas fa-map-marker-alt text-rose-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                            Tharamani
                          </h4>
                          <p className="text-sm text-gray-600">
                            Chennai, Tamil Nadu
                          </p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400 group-hover:text-rose-600 transition-colors"></i>
                    </a>
                  </div>
                </div>

                {/* Bangalore */}
                <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <i className="fas fa-city text-green-600 text-xl"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Bangalore
                    </h3>
                  </div>
                  <div className="grid gap-6">
                    {/* Whitefield */}
                    <a
                      href="https://maps.app.goo.gl/QqnmUoyjmRuTU9Tv5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-green-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                          <i className="fas fa-map-marker-alt text-green-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            Whitefield
                          </h4>
                          <p className="text-sm text-gray-600">
                            Bangalore, Karnataka
                          </p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400 group-hover:text-green-600 transition-colors"></i>
                    </a>

                    {/* Marathalli */}
                    <a
                      href="https://maps.app.goo.gl/ubbsZMkBu9kFt2hr7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-yellow-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                          <i className="fas fa-map-marker-alt text-yellow-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                            Marathalli
                          </h4>
                          <p className="text-sm text-gray-600">
                            Bangalore, Karnataka
                          </p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400 group-hover:text-yellow-600 transition-colors"></i>
                    </a>

                    {/* JP Nagar */}
                    <a
                      href="https://maps.app.goo.gl/ZjD7921s7vaoLg9cA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-pink-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                          <i className="fas fa-map-marker-alt text-pink-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                            JP Nagar
                          </h4>
                          <p className="text-sm text-gray-600">
                            Bangalore, Karnataka
                          </p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400 group-hover:text-pink-600 transition-colors"></i>
                    </a>

                    {/* Yeshwanthpur */}
                    <a
                      href="https://maps.app.goo.gl/1J989hdZrNDFPHpp6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                          <i className="fas fa-map-marker-alt text-blue-600"></i>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            Yeshwanthpur
                          </h4>
                          <p className="text-sm text-gray-600">
                            Bangalore, Karnataka
                          </p>
                        </div>
                      </div>
                      <i className="fas fa-arrow-right text-gray-400 group-hover:text-blue-600 transition-colors"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Section */}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Frequently Asked Questions
                </h1>
                <p className="text-gray-600">
                  In case you have more questions, feel free to reach out to us.
                </p>
              </div>

              {/* FAQ Items */}
              <div className="divide-y divide-gray-200">
                {faqData.map((faq, index) => (
                  <div key={index} className="py-6">
                    <button
                      className="w-full flex items-center justify-between text-left group"
                      onClick={() => toggleFAQ(index)}
                    >
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
                        {faq.question}
                      </h3>
                      <span
                        className={`ml-6 flex-shrink-0 transition-transform duration-200 ${
                          openFAQ === index ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4 6L8 10L12 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                    {openFAQ === index && (
                      <div className="mt-3">
                        <div className="text-base text-gray-600">
                          {faq.answer.map((line, i) => (
                            <p key={i} className="mb-2">
                              {line}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="text-center bg-blue-600 rounded-3xl p-12 shadow-xl transform hover:-translate-y-1 transition-all duration-300 mb-20 max-w-7xl mx-auto">
          <h3 className="md:text-3xl text-xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h3>
          <p className="text-white mb-8 md:text-lg">
            Join our community of learners and unlock your potential today.
          </p>
          <button
            onClick={() =>
              (window.location.href = "https://wa.me/+917305959397")
            }
            className="bg-white text-blue-600 px-4 md:px-8 md:py-4 py-2 rounded-full text-sm md:text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl inline-flex items-center"
          >
            Join Our Learning Community
            <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>

        {/* Footer */}
        <Footer />

        {/* Call to Action */}
      </div>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
};

export default Home;
