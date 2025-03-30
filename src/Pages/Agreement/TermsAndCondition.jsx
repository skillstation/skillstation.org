import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const TermsAndCondition = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-[80px]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Terms and Conditions
        </h1>

        <main className="prose prose-blue max-w-none">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to SkillStation Academy. By accessing or using our
              platform, you agree to abide by these Terms and Conditions. Please
              read them carefully before proceeding.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
            <p>
              To access certain features, you must create an account. You agree
              to:
            </p>
            <ul className="list-disc pl-6">
              <li>Provide accurate and complete information.</li>
              <li>Keep your login credentials confidential.</li>
              <li>Be responsible for any activity under your account.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">3. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6">
              <li>Engage in fraudulent, harmful, or illegal activities.</li>
              <li>Distribute unauthorized content or spam.</li>
              <li>Violate intellectual property rights.</li>
              <li>Interfere with platform functionality or security.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              4. Payments and Refunds
            </h2>
            <p>
              If you purchase any courses or services, you agree to our pricing
              and refund policies outlined separately.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              5. Intellectual Property
            </h2>
            <p>
              All content on this platform, including text, videos, and
              graphics, is the property of SkillStation Academy and may not be
              copied, modified, or distributed without permission.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              6. Limitation of Liability
            </h2>
            <p>
              We are not liable for any indirect, incidental, or consequential
              damages resulting from your use of our platform.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access if you
              violate these terms.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">8. Changes to Terms</h2>
            <p>
              We may update these Terms and Conditions from time to time.
              Continued use of our platform signifies your acceptance of any
              changes.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">9. Contact Us</h2>
            <p>If you have any questions, feel free to contact us at:</p>
            <p className="text-blue-500">support@skillstation.org</p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndCondition;
