import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-gray-900 py-6 px-6" id="footer">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">© 2024 Assistant Marketer. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link className="text-sm text-gray-400 hover:text-gray-300" href="/privacy-policy">
            Privacy Policy
          </Link>
          <Link className="text-sm text-gray-400 hover:text-gray-300" href="/terms-of-service">
            Terms of Service
          </Link>
          <Link className="text-sm text-gray-400 hover:text-gray-300" href="/#contact">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  )
}
