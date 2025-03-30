import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Refund = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-[80px]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Refund Policy</h1>

        <main className="prose prose-blue max-w-none">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              At SkillStation Academy, we strive to provide high-quality
              educational content. If you are not satisfied with your purchase,
              please review our refund policy below.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              2. Eligibility for Refund
            </h2>
            <p>Refund requests must meet the following conditions:</p>
            <ul className="list-disc pl-6">
              <li>Request is made within 7 days of purchase.</li>
              <li>
                The course or service has not been completed or heavily
                accessed.
              </li>
              <li>No certification has been issued for the course.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              3. Non-Refundable Items
            </h2>
            <p>The following items are non-refundable:</p>
            <ul className="list-disc pl-6">
              <li>Downloaded digital materials.</li>
              <li>Completed courses with issued certifications.</li>
              <li>Promotional or discounted purchases.</li>
              <li>Subscription-based services after the trial period.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">4. Refund Process</h2>
            <p>To request a refund, follow these steps:</p>
            <ul className="list-disc pl-6">
              <li>
                Contact our support team at{" "}
                <span className="text-blue-500">support@skillstation.org</span>.
              </li>
              <li>
                Provide your order details and reason for the refund request.
              </li>
              <li>Allow up to 7 business days for review and processing.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">5. Payment Reversals</h2>
            <p>
              Approved refunds will be processed via the original payment method
              within 10 business days. Processing times may vary depending on
              your bank or payment provider.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">6. Contact Us</h2>
            <p>
              If you have any questions regarding our refund policy, feel free
              to contact us at:
            </p>
            <p className="text-blue-500">support@skillstation.org</p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Refund;
