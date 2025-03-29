import React from "react";
import { Link } from "react-router-dom";
import WhiteLogo from "../../assets/WhiteLogo.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand and Social Links */}
          <div>
            <Link to="/">
              <img
                src={WhiteLogo}
                className="max-w-[180px]"
                alt="Skill Station Academy"
              />
            </Link>
            <p className="text-gray-400 mb-4">Follow us on</p>
            <div className="flex gap-4 mb-8">
              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
              >
                <i className="fab fa-youtube"></i>
              </a>
              <a
                href="#"
                className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>

            <div>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletters!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 border border-gray-700 bg-black/50 h-12 px-4 py-3 rounded-lg text-sm focus:outline-none focus:border-blue-500 text-white"
                />
                <button
                  type="submit"
                  className="bg-[#0041F5] text-white px-6 h-12 rounded-lg hover:bg-blue-600 transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Organisation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Organisation</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Programmes Offered
                </Link>
              </li>
              <li>
                <Link
                  to="/mentors"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Our Mentors
                </Link>
              </li>
              <li>
                <Link
                  to="/testimonials"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Links</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/workshops"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Workshops
                </Link>
              </li>
              <li>
                <Link
                  to="/tisat"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  TiSAT
                </Link>
              </li>
              <li>
                <Link
                  to="/iitjee"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  IIT JEE
                </Link>
              </li>
              <li>
                <Link
                  to="/gate"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GATE
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Cities</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">Chennai</li>
                <li className="text-gray-400">Bangalore</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Registered Office */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Registered Office:</h4>
              <p className="text-gray-400">
                3362-B AE Block, 8th Street, 10th Main Rd, near Blue Star Post
                Office, Anna Nagar, Chennai, Tamil Nadu 600040
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between pt-10 gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-4">
              <span className="text-gray-400 font-semibold text-white">
                Email:
              </span>
              <span className="text-gray-400">info@skillstation.org</span>
              <span className="text-gray-400 font-semibold text-white">
                Office:
              </span>
              <span className="text-gray-400">044-44567654</span>
              <span className="text-gray-400 font-semibold text-white">
                WhatsApp:
              </span>
              <span className="text-gray-400">7305959397</span>
              <span className="text-gray-400 font-semibold text-white">
                Reg. No:
              </span>
              <span className="text-gray-400">11149/2022</span>
            </div>
          </div>
          <p className="text-gray-400 mt-4 md:mt-0">
            ©2025 Skillstation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
