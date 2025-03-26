import React, { useState } from "react";
import logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <nav className="relative">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-5 px-4 font-poppins">
        <img src={logo} className="max-w-[180px]" alt="logo" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-12 font-semibold font-poppins text-[16px]">
          <div className="relative">
            <Link
              to="/"
              className="relative group hover:text-[#0041F5] hover:scale-105 transition-all duration-300"
            >
              Workshops
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                Click here to register for workshop
              </span>
            </Link>
          </div>
          <Link to="/workshop" className="hover:text-[#0041F5] duration-300">
            TISAT Exam
          </Link>
          <Link to="/about" className="hover:text-[#0041F5] duration-300">
            About us
          </Link>
          <a
            href="#mentors-section"
            className="hover:text-[#0041F5] duration-300 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("mentors-section")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            Our Mentor
          </a>
        </div>

        {/* Desktop Get in Touch button */}
        <a
          href="https://wa.me/+917305959397"
          className="hidden md:block bg-[#0A57FF] text-white px-4 py-2 rounded-md text-lg font-bold hover:bg-[#0041F5] transition-colors"
        >
          Contact Us
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl cursor-pointer z-20"
          onClick={() => setIsMobile(!isMobile)}
        >
          {isMobile ? (
            <FaTimes className="text-white" />
          ) : (
            <FaBars className="text-black" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed top-0 right-0 w-full h-screen bg-[#0A57FF] transform transition-transform duration-300 ease-in-out ${
            isMobile ? "translate-x-0" : "translate-x-full"
          } z-10`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <Link
              to="/"
              className="text-white text-2xl font-bold"
              onClick={() => setIsMobile(false)}
            >
              Workshops
            </Link>
            <Link
              to="/workshop"
              className="text-white text-2xl font-bold"
              onClick={() => setIsMobile(false)}
            >
              TISAT Exam
            </Link>
            <Link
              to="/about"
              className="text-white text-2xl font-bold"
              onClick={() => setIsMobile(false)}
            >
              About us
            </Link>
            <a
              href="https://wa.me/+917305959397"
              className="bg-white text-[#0A57FF] px-6 py-3 rounded-md text-xl font-bold mt-4"
              onClick={() => setIsMobile(false)}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
