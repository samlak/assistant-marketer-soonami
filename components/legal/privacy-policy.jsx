import Link from "next/link"

export function PrivacyPolicy() {
  return (
    <main className="px-6 py-8 mx-auto max-w-3xl">
      <header>
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-6">Last updated: May 30, 2024</p>
      </header>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
        <p className="mb-4">
          This Privacy Policy explains how Assistant Marketer, an AI-powered marketing assistant platform, collects,
          uses, and protects the personal information of its users. By using the Assistant Marketer platform (the
          "Platform"), you agree to the terms of this Privacy Policy.
        </p>
        <p className="mb-4">
          Assistant Marketer is committed to protecting the privacy and security of your personal information. We
          understand the importance of maintaining the confidentiality of your data, and we strive to ensure that your
          information is handled with the utmost care and in compliance with applicable laws and regulations.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
        <p className="mb-4">Assistant Marketer collects the following types of personal information from its users:</p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Contact information:</strong> This includes your name, email address, and any other contact details you provide when
            you sign up for the Platform.
          </li>
          <li>
            <strong>Account information:</strong> This includes your username, password, and any other information you provide to create
            and manage your account.
          </li>
          <li>
            <strong>Usage data:</strong> This includes information about how you use the Platform, such as the features you access, the
            content you interact with, and the actions you perform.
          </li>
          <li>
            <strong>Marketing data:</strong> This includes information about your marketing activities and campaigns, such as the content
            you create, the channels you use, and the performance metrics you track.
          </li>
        </ul>
        <p className="mb-4">
          We may also collect certain non-personal information, such as your device type, operating system, and browser
          information, to help us improve the Platform and provide a better user experience.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
        <p className="mb-4">
          Assistant Marketer uses the information we collect to provide and improve the Platform, as well as to
          communicate with you about your account and our services. Specifically, we may use your information for the
          following purposes:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>To create and manage your account on the Platform.</li>
          <li>
            To provide the Platform's services, such as content creation, social media management, and performance
            analytics.
          </li>
          <li>
            To communicate with you about your account, including sending you updates, notifications, and other
            information.
          </li>
          <li>To improve the Platform's features and functionality based on your feedback and usage data.</li>
          <li>To analyze the performance of your marketing campaigns and provide insights and recommendations.</li>
          <li>
            To comply with legal and regulatory requirements, and to protect the rights and interests of Assistant
            Marketer and its users.
          </li>
        </ul>
        <p className="mb-4">
          We will not sell, rent, or share your personal information with third parties for their own marketing purposes
          without your consent, except as required by law or as necessary to provide the Platform's services.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">4. Data Security and Retention</h2>
        <p className="mb-4">
          Assistant Marketer takes the security of your personal information seriously. We implement industry-standard
          security measures, including encryption and access controls, to protect your data from unauthorized access,
          disclosure, or misuse.
        </p>
        <p className="mb-4">
          We will retain your personal information for as long as necessary to provide the Platform's services and to
          comply with our legal and regulatory obligations. When we no longer need your personal information, we will
          securely delete or destroy it.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">5. Your Rights and Choices</h2>
        <p className="mb-4">
          You have certain rights with respect to your personal information, including the right to access, correct, and
          delete your information. You can exercise these rights by contacting us at  {" "}
          <Link className="text-blue-500 hover:underline" href="mailto:support@assistantmarketer.com">
            support@assistantmarketer.com
          </Link>
          .
        </p>
        <p className="mb-4">
          You can also choose to opt-out of certain marketing communications from Assistant Marketer by following the
          unsubscribe instructions in the emails you receive or by contacting us.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">6. Changes to this Privacy Policy</h2>
        <p className="mb-4">
          Assistant Marketer may update this Privacy Policy from time to time. We will post any changes on the Platform
          and notify you of any material changes. Your continued use of the Platform after the posting of the revised
          Privacy Policy constitutes your acceptance of the changes.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy or the way we handle your personal
          information, please contact us at {" "}
          <Link className="text-blue-500 hover:underline" href="mailto:support@assistantmarketer.com">
            support@assistantmarketer.com
          </Link>
          .
        </p>
      </section>
    </main>
  )
}