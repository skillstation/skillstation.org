import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-[80px]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Privacy Policy
        </h1>

        <main className="prose prose-blue max-w-none">
          <p className="mb-6">
            <strong>Effective Date:</strong> 1 March 2025
          </p>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Skill Station Academy ("we," "our," or "us") is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website (www.skillstation.org) and use our services. By
              accessing our website, you agree to the terms outlined in this
              Privacy Policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              2. Information We Collect
            </h2>
            <p>We collect the following types of information:</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, age, gender, educational details, and payment
                details.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> Browser type, IP
                address, device information, and usage data through cookies and
                analytics tools.
              </li>
              <li>
                <strong>Payment Information:</strong> Processed through secure
                third-party payment gateways; we do not store your payment
                details.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              3. How We Use Your Information
            </h2>
            <p>We use your data to:</p>
            <ul className="list-disc pl-6">
              <li>Provide and improve our services.</li>
              <li>Process transactions and send payment confirmations.</li>
              <li>Respond to inquiries and provide customer support.</li>
              <li>
                Send promotional and educational materials (with your consent).
              </li>
              <li>Enhance website security and prevent fraud.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              4. Sharing of Information
            </h2>
            <p>
              We do not sell, trade, or rent user information. However, we may
              share information with:
            </p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Third-Party Service Providers:</strong> Payment
                processors, hosting providers, analytics tools.
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law or to
                prevent fraudulent activities.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your data
              from unauthorized access, alteration, or disclosure. However, no
              method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">6. User Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6">
              <li>Access, update, or delete your personal data.</li>
              <li>Opt out of marketing communications.</li>
              <li>Request information on how your data is used.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              7. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies to enhance user experience. You can manage cookie
              preferences through your browser settings.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">8. Data Retention</h2>
            <p>
              We retain your data only for as long as necessary to fulfill the
              purposes outlined in this Privacy Policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              9. Children's Privacy
            </h2>
            <p>
              Our services are not intended for children under 18. If we
              discover that a child has provided personal data, we will delete
              it immediately.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              10. Changes to this Privacy Policy
            </h2>
            <p>
              We reserve the right to update this Privacy Policy at any time.
              Changes will be posted on this page with an updated effective
              date.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              11. Contact Information
            </h2>
            <p>
              If you have questions regarding this Privacy Policy, please
              contact us at:
            </p>
            <p className="text-blue-500">skillstation.academy@gmail.com</p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
