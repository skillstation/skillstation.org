import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Refund = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-[80px]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Refund & Cancellation Policy – Skill Station Academy
        </h1>

        <main className="prose prose-blue max-w-none">
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              1. Refund Request Submission
            </h2>
            <p>
              All refund requests must be officially sent via email to{" "}
              <span className="text-blue-500">
                skillstation.academy@gmail.com
              </span>{" "}
              with relevant details, including transaction proof and the reason
              for the refund request.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              2. Non-Eligibility for Refunds
            </h2>
            <p>
              Refund requests <strong>will not be considered</strong> under the
              following circumstances:
            </p>
            <ul className="list-disc pl-6">
              <li>After the completion of a course or workshop.</li>
              <li>
                After the commencement of an exam for which registration has
                been completed.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              3. Transaction Cancellation Policy
            </h2>
            <p>
              Upon completing a transaction for course enrollment, workshop
              registration, or exam booking, you enter into a legally binding
              agreement with Skill Station Academy. Cancellations may only be
              allowed if explicitly stated on our platform. Any such
              cancellations will be subject to the terms mentioned at the time
              of purchase. Skill Station Academy reserves the right to review
              and approve cancellation requests at its discretion and may
              request additional details before processing any cancellation.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              4. Refund Eligibility
            </h2>
            <p>
              Refunds will only be considered under the following conditions:
            </p>
            <ul className="list-disc pl-6">
              <li>
                If the course, workshop, or exam service provided does not match
                the description mentioned on our platform.
              </li>
              <li>
                If the cancellation request is submitted within{" "}
                <strong>three days from the date of payment</strong>, unless
                otherwise specified on the platform.
              </li>
            </ul>
            <p className="mt-3">
              To initiate a refund claim, users must email us at{" "}
              <span className="text-blue-500">
                skillstation.academy@gmail.com
              </span>
              , providing a <strong>clear and specific reason</strong> along
              with supporting proof, if required. Skill Station Academy will
              review the request and may seek additional information before
              making a final decision.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-2">
              5. Final Decision on Refunds
            </h2>
            <p>
              Skill Station Academy holds the sole discretion in approving or
              rejecting any refund requests. Approved refunds will be processed
              through the original payment method within a reasonable timeframe.
            </p>
          </section>

          <p className="mt-6">
            By making a purchase, you acknowledge and agree to abide by this
            Refund & Cancellation Policy.
          </p>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Refund;
