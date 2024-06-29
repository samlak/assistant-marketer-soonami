import Link from "next/link"

export function Contact() {
  return (
    <section className="px-6 py-12 flex items-center justify-center bg-gray-50" id="contact">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          <div className="text-center">
            <p className="text-lg text-gray-600 w-full">
              Have questions or need support? Reach out to us at {" "}
              <Link 
                className="text-blue-600 hover:underline" 
                href="mailto:support@assistantmarketer.com"
              >
                support@assistantmarketer.com
              </Link>
            </p>
          </div>
      </div>
    </section>
  )
}
