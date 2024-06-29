import Link from "next/link"

export function TermsOfService() {
  return (
    <main className="px-6 py-8 mx-auto max-w-3xl">
      <header>
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-6">Last updated: May 30, 2024</p>
      </header>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
        <p className="mb-4">
          These Terms of Service ("Terms") govern your access to and use of the Assistant Marketer platform, including
          any content, functionality, and services offered on or through the platform (the "Platform"). By using the
          Platform, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you should
          not access or use the Platform.
        </p>
        <p className="mb-4">
          Assistant Marketer is an AI-powered marketing assistant platform designed to help early-stage founders with
          their marketing efforts. The Platform provides a range of services, including content creation, social media
          management, and performance analytics.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">2. Scope of Services</h2>
        <p className="mb-4">The Platform offers the following services:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Content creation:</strong> The Platform can generate a variety of marketing content, including blog posts, social
            media posts, and email newsletters.
          </li>
          <li>
            <strong>Social media management:</strong> The Platform can schedule and publish content on your social media channels, as
            well as monitor and respond to engagement.
          </li>
          <li>
            <strong>Performance analytics:</strong> The Platform provides detailed analytics on the performance of your marketing
            campaigns, including metrics such as website traffic, lead generation, and conversion rates.
          </li>
        </ul>
        <p className="mb-4">
          The specific features and functionality of the Platform may be updated or modified from time to time at the
          sole discretion of Assistant Marketer.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">3. Data Privacy and Security</h2>
        <p className="mb-4">
          Assistant Marketer takes the privacy and security of your data seriously. We will collect and use your
          personal information in accordance with our {" "}
          <Link className="text-blue-500 hover:underline" href="/privacy-policy">
            Privacy Policy
          </Link>
          . We implement industry-standard security measures to protect your data from unauthorized access, disclosure,
          or misuse.
        </p>
        <p className="mb-4">
          You are responsible for maintaining the confidentiality of your account credentials and for any activity that
          occurs under your account. You agree to notify us immediately of any unauthorized access or use of your
          account.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">4. Intellectual Property</h2>
        <p className="mb-4">
          The Platform, including all content, features, and functionality, is the property of Assistant Marketer and is
          protected by copyright, trademark, and other intellectual property laws. You may not modify, copy, distribute,
          transmit, display, reproduce, or create derivative works from the Platform without our prior written consent.
        </p>
        <p className="mb-4">
          Any content you upload, submit, or post to the Platform remains your property. However, by uploading,
          submitting, or posting such content, you grant Assistant Marketer a non-exclusive, royalty-free, worldwide
          license to use, reproduce, modify, and distribute the content as necessary to provide the Platform's services.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">5. Limitations of Liability</h2>
        <p className="mb-4">
          Assistant Marketer will use reasonable efforts to maintain the availability and performance of the Platform,
          but we do not guarantee that the Platform will be error-free or uninterrupted. We will not be liable for any
          damages or losses arising from the use or inability to use the Platform, including but not limited to direct,
          indirect, incidental, special, or consequential damages.
        </p>
        <p className="mb-4">
          In no event shall Assistant Marketer's total liability to you for all damages, losses, and causes of action
          (whether in contract, tort, or otherwise) exceed the amount paid by you, if any, for accessing or using the
          Platform.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">6. Termination</h2>
        <p className="mb-4">
          These Terms will remain in effect until terminated. You may terminate your use of the Platform at any time by
          discontinuing your use of the Platform. Assistant Marketer may terminate your access to the Platform at any
          time for any reason, including if we reasonably believe that you have violated these Terms.
        </p>
        <p className="mb-4">
          Upon termination, your right to use the Platform will immediately cease, and you must destroy any copies of
          any part of the Platform that are in your possession.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">7. Refund Policy</h2>
        <p className="mb-4">
          Due to the nature of the Assistant Marketer platform, we do not offer refunds after purchase. Once you have
          subscribed to our services, we cannot provide a refund. We are committed to providing you with the best
          possible experience, and we believe that our platform will deliver significant value to your business. If you
          have any concerns or issues, please reach out to our support team, and we will do our best to address them.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">8. Governing Law and Dispute Resolution</h2>
        <p className="mb-4">
          These Terms and your use of the Platform shall be governed by and construed in accordance with the laws of
          the State of California, without giving effect to any principles of conflicts of law. Any dispute arising out of or
          relating to these Terms or the Platform shall be resolved through binding arbitration in accordance with the
          rules of the American Arbitration Association.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">9. Miscellaneous</h2>
        <p className="mb-4">
          These Terms constitute the entire agreement between you and Assistant Marketer regarding the use of the
          Platform. If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions
          will continue to be valid and enforceable.
        </p>
        <p className="mb-4">
          Assistant Marketer may modify these Terms at any time by posting the revised Terms on the Platform. Your
          continued use of the Platform after the posting of the revised Terms constitutes your acceptance of the
          changes.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about these Terms or the Platform, please contact us at {" "}
          <a className="text-blue-500 hover:underline" href="mailto:support@assistantmarketer.com">
            support@assistantmarketer.com
          </a>
          .
        </p>
      </section>
    </main>
  )
}