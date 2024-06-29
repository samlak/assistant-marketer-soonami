import {
  RocketIcon,
  ClipboardListIcon,
  BarChartIcon,
  LightbulbIcon
} from "lucide-react"
import { Card } from "@/components/ui/card"

export function Why() {
  return (
    <section className="py-16" id="why">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose Assistant Marketer?</h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-start">
              <RocketIcon className="mr-4 mt-1 h-10 w-10 text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold">Accelerate Your Growth</h3>
                <p className="mt-2 text-gray-600">
                  Our AI-powered marketing tools and strategies will help you acquire new customers and scale your
                  business faster.
                </p>
              </div>
            </div>
          </Card>
          <Card className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-start">
              <ClipboardListIcon className="mr-4 mt-1 h-10 w-10 text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold">Streamline Your Marketing</h3>
                <p className="mt-2 text-gray-600">
                  Automate your marketing tasks and focus on the high-impact activities that drive real results for
                  your business.
                </p>
              </div>
            </div>
          </Card>
          <Card className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-start">
              <BarChartIcon className="mr-4 mt-1 h-10 w-10 text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold">Data-Driven Decisions</h3>
                <p className="mt-2 text-gray-600">
                  Our advanced analytics and reporting tools provide you with the insights you need to make informed,
                  data-driven marketing decisions.
                </p>
              </div>
            </div>
          </Card>
          <Card className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-start">
              <LightbulbIcon className="mr-4 mt-1 h-10 w-10 text-blue-600" />
              <div>
                <h3 className="text-xl font-semibold">Innovative Strategies</h3>
                <p className="mt-2 text-gray-600">
                  Our team of marketing experts is constantly researching and implementing the latest growth hacking
                  techniques to help you stay ahead of the competition.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
