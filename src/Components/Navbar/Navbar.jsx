import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import Marquee from "../Marquee/Marquee";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".mobile-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50  ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <Marquee />
      <nav className="h-[80px] bg-white ">
        <div className="flex justify-between items-center h-full max-w-7xl mx-auto px-4 font-poppins">
          <Link to="/">
            <img src={logo} className="max-w-[180px]" alt="logo" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-12 font-semibold font-poppins text-[16px]">
            <div className="relative">
              <Link
                to="/workshops"
                className="relative group hover:text-[#0041F5] hover:scale-105 transition-all duration-300"
              >
                Workshops
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Click here to register for workshop
                </span>
              </Link>
            </div>
            <Link to="/tisat" className="hover:text-[#0041F5] duration-300">
              TISAT Exam
            </Link>
            <Link
              to="/"
              className="hover:text-[#0041F5] duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about-section")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              About us
            </Link>
            <Link
              to="/"
              className="hover:text-[#0041F5] duration-300 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("mentors-section")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Our Mentor
            </Link>
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
            className="md:hidden text-2xl cursor-pointer z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <FaTimes className="text-white" />
            ) : (
              <FaBars className="text-black" />
            )}
          </button>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-0 bg-[#0A57FF] md:hidden transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } z-40`}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 mobile-menu-container">
              <Link
                to="/"
                className="text-white text-2xl font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Workshops
              </Link>
              <Link
                to="/workshop"
                className="text-white text-2xl font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                TISAT Exam
              </Link>
              <Link
                to="/about"
                className="text-white text-2xl font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                About us
              </Link>
              <a
                href="#mentors-section"
                className="text-white text-2xl font-bold"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMenuOpen(false);
                  document
                    .getElementById("mentors-section")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                Our Mentor
              </a>
              <a
                href="https://wa.me/+917305959397"
                className="bg-white text-[#0A57FF] px-6 py-3 rounded-md text-xl font-bold mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
