export function FAQ() {
  const faqs = [
    {
      "question": "How does Assistant Marketer's AI-powered marketing assistant work?",
      "answer": "Assistant Marketer's AI-powered marketing assistant utilizes advanced algorithms to manage and optimize marketing activities. It conducts market research, creates brand strategies, generates and distributes content, manages social media, handles email marketing, and optimizes for SEO. This allows early-stage founders to focus on other critical aspects of their business."
    },
    {
      "question": "What features does Assistant Marketer offer?",
      "answer": "Assistant Marketer offers a comprehensive set of features to streamline marketing efforts. These include market research analysis, brand creation tools, content generation and distribution, social media content management, email marketing automation, and SEO optimization. These tools work together to provide a holistic marketing solution."
    },
    {
      "question": "Can Assistant Marketer help with brand creation and market research?",
      "answer": "Absolutely! Assistant Marketer supports founders in creating a strong brand by conducting market research to understand target audiences and industry trends. It helps in developing a brand strategy that resonates with customers and stands out in the market. This ensures a well-informed and effective brand presence."
    },
    {
      "question": "How can I track my marketing progress with Assistant Marketer?",
      "answer": "Assistant Marketer offers various tools to track marketing performance and progress. Users can access detailed analytics and reports on market trends, brand performance, content engagement, social media metrics, email campaign results, and SEO rankings. These insights help founders make data-driven decisions and refine their marketing strategies."
    },
    {
      "question": "How can I benefit from using Assistant Marketer?",
      "answer": "Using Assistant Marketer can significantly benefit early-stage founders by automating time-consuming marketing tasks. It provides insights from market research, helps create a strong brand presence, generates engaging content, and manages distribution across multiple channels. This leads to better audience engagement, higher conversion rates, and more efficient use of time and resources."
    },
    {
      "question": "Can I customize my marketing campaigns with Assistant Marketer?",
      "answer": "Yes, Assistant Marketer allows users to customize their marketing campaigns. Founders can set specific goals, choose target audiences, and tailor content and distribution schedules to align with their brand strategy and marketing objectives. This customization ensures that campaigns are effective and meet the unique needs of each business."
    },
    {
      "question": "Is Assistant Marketer suitable for all types of businesses?",
      "answer": "While Assistant Marketer is especially beneficial for early-stage founders, it is designed to cater to a wide range of business types and sizes. Its adaptive features and customizable tools make it suitable for various industries, ensuring businesses can enhance their marketing efforts regardless of their specific niche."
    },
    {
      "question": "Is Assistant Marketer accessible on mobile devices?",
      "answer": "Yes, Assistant Marketer is accessible on a variety of mobile devices, including smartphones and tablets. The platform is optimized for mobile use, allowing users to manage their marketing activities, review analytics, and make adjustments on the go. This mobile accessibility ensures that founders can stay connected and responsive to their marketing needs anytime, anywhere."
    }
  ]


  
  const faq1 = faqs.slice(0, 4); 
  const faq2 = faqs.slice(4, 8); 

  return (
    <section className="px-6 py-12" id="faq">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {faq1.map((faq, key) => (
              <details className="p-4 bg-gray-100 rounded-lg" key={key}>
                <summary className="font-semibold">{faq.question}</summary>
                <p className="pt-2 text-sm text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
          <div className="space-y-4">
            {faq2.map((faq, key) => (
              <details className="p-4 bg-gray-100 rounded-lg" key={key}>
                <summary className="font-semibold">{faq.question}</summary>
                <p className="pt-2 text-sm text-gray-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
