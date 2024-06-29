import {
  MegaphoneIcon,
  PaletteIcon,
  MailboxIcon,
  SearchIcon,
  RocketIcon,
  LightbulbIcon
} from "lucide-react"
import { Card } from "@/components/ui/card"

export function Feature() {
  return (
    <section className="py-16" id="feature">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">Explore Our Features</h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <Card className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
              <LightbulbIcon className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-semibold">Content Creation</h3>
              <p className="mt-2 text-gray-600">
                Generate high-quality content for your website, social media, and email campaigns.
              </p>
            </div>
          </Card>

          <Card className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
              <PaletteIcon className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-semibold">Brand Creation</h3>
              <p className="mt-2 text-gray-600">
                Develop a strong and memorable brand identity for your business.
              </p>
            </div>
          </Card>

          <Card className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
              <RocketIcon className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-semibold">Growth Hacking</h3>
              <p className="mt-2 text-gray-600">
                Implement proven growth strategies to acquire new customers and scale your business.
              </p>
            </div>
          </Card>

          <Card className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
              <MailboxIcon className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-semibold">Email Marketing</h3>
              <p className="mb-1 text-gray-600 font-medium">Coming soon</p>
              <p className="mt-2 text-gray-600">
                Craft and send personalized email campaigns to your leads and customers.
              </p>
            </div>
          </Card>

          <Card className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
              <SearchIcon className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-semibold">SEO Optimization</h3>
              <p className="mb-1 text-gray-600 font-medium">Coming soon</p>
              <p className="mt-2 text-gray-600">
                Improve your website's search engine visibility and drive more organic traffic.
              </p>
            </div>
          </Card>

          <Card className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center text-center">
              <MegaphoneIcon className="mb-4 h-12 w-12 text-blue-600" />
              <h3 className="text-xl font-semibold">Social Media Management</h3>
              <p className="mb-1 text-gray-600 font-medium">Coming soon</p>
              <p className="mt-2 text-gray-600">
                Automate your social media posts, engage with your audience, and track your performance.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}