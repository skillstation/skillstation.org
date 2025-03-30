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
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
            <p>
              Welcome to SkillStation Academy. Your privacy is important to us.
              This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our platform.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6">
              <li>
                <strong>Personal Information:</strong> Name, email address,
                phone number, date of birth, and other details provided during
                registration.
              </li>
              <li>
                <strong>Academic Information:</strong> Course enrollments,
                progress, assessments, and certifications.
              </li>
              <li>
                <strong>Payment Information:</strong> Billing details if
                applicable.
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, browser type,
                device information, and cookies.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              3. How We Use Your Information
            </h2>
            <ul className="list-disc pl-6">
              <li>Provide and improve our educational services.</li>
              <li>Personalize the user experience.</li>
              <li>Communicate updates, offers, and announcements.</li>
              <li>Process payments and maintain security.</li>
              <li>Comply with legal obligations.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              4. Information Sharing & Disclosure
            </h2>
            <p>
              We do not sell or rent your personal data. However, we may share
              information with:
            </p>
            <ul className="list-disc pl-6">
              <li>
                Service providers assisting in platform operations (e.g.,
                payment processors, hosting services).
              </li>
              <li>Legal authorities if required by law.</li>
              <li>In case of business transfer (e.g., merger, acquisition).</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your data
              from unauthorized access, alteration, or loss. However, no online
              platform is 100% secure, and we encourage responsible online
              behavior.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              6. Your Rights & Choices
            </h2>
            <p>As a student, you have the right to:</p>
            <ul className="list-disc pl-6">
              <li>Access, update, or delete your personal data.</li>
              <li>Opt-out of marketing communications.</li>
              <li>Restrict or object to data processing in certain cases.</li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">7. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites. We are not
              responsible for their privacy practices and encourage you to
              review their policies separately.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              8. Cookies & Tracking Technologies
            </h2>
            <p>
              We use cookies to enhance your browsing experience. You can manage
              cookie preferences in your browser settings.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              9. Updates to This Policy
            </h2>
            <p>
              We may update this Privacy Policy periodically. Any significant
              changes will be communicated through our platform.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
            <p>
              For any questions or concerns about this Privacy Policy, please
              contact us at:
            </p>
            <p className="text-blue-500">contact@skillstation.org</p>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Privacy;
