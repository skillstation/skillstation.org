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
          <p className="mb-6">
            <strong>Effective Date:</strong> 1 March 2025
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing this website (www.skillstation.org), you agree to
              comply with these Terms and Conditions. If you do not agree, you
              should not use our platform.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
            <p>
              You must be at least 18 years old to use our services. If you are
              under 18, you must obtain parental consent.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              3. User Responsibilities
            </h2>
            <ul className="list-disc pl-6">
              <li>Provide accurate registration details.</li>
              <li>Maintain confidentiality of login credentials.</li>
              <li>Do not engage in fraudulent or harmful activities.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              4. Intellectual Property
            </h2>
            <p>
              All content on this website, including text, graphics, logos, and
              software, is the property of Skill Station Academy and protected
              by copyright laws.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              5. Prohibited Activities
            </h2>
            <p>Users must not:</p>
            <ul className="list-disc pl-6">
              <li>
                Attempt to hack, disrupt, or interfere with website operations.
              </li>
              <li>Use content for commercial purposes without permission.</li>
              <li>Upload or share illegal or offensive content.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              6. Payment and Refund Policy
            </h2>
            <ul className="list-disc pl-6">
              <li>Payments must be made through secure channels.</li>
              <li>
                Refund requests will be considered based on service completion
                status and specific terms outlined at the time of enrollment.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              7. Limitation of Liability
            </h2>
            <p>
              Skill Station Academy is not liable for any direct or indirect
              damages resulting from the use of our services.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">8. Termination</h2>
            <p>
              We reserve the right to terminate user access if there is a breach
              of these Terms and Conditions.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              9. Governing Law and Dispute Resolution
            </h2>
            <p>
              These Terms are governed by the laws of India. Disputes will be
              resolved through arbitration in Bengaluru under the Arbitration
              and Conciliation Act, 1996.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              10. Contact Information
            </h2>
            <p>For queries regarding these Terms, contact us at:</p>
            <p className="text-blue-500">skillstation.academy@gmail.com</p>
          </section>

          <p className="mt-6">
            By using our website, you agree to these Terms and Conditions.
          </p>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndCondition;
