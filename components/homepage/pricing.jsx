import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";

export function Pricing() {
  return (
    <section className="py-16 bg-gray-100" id="pricing">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Pricing
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Choose the plan that fits your business needs
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl md:w-full sm:w-[70%] w-[95%] mx-auto">
          <Card className="bg-white shadow-md rounded-lg p-6">
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Perfect for small businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mt-6 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Brand creation
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Custom content creation
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Target audience research
                </li>
                <li className="flex items-center">
                  <XIcon className="mr-2 h-5 w-5 text-gray-400" />
                  Social media management
                </li>
                <li className="flex items-center">
                  <XIcon className="mr-2 h-5 w-5 text-gray-400" />
                  Email marketing campaigns
                </li>
                <li className="flex items-center">
                  <XIcon className="mr-2 h-5 w-5 text-gray-400" />
                  Advanced SEO optimization
                </li>
                <li className="flex items-center">
                  <XIcon className="mr-2 h-5 w-5 text-gray-400" />
                  Growth hacking strategies
                </li>
                <li className="flex items-center">
                  <XIcon className="mr-2 h-5 w-5 text-gray-400" />
                  Competitor analysis
                </li>
              </ul>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "mt-6 w-full"
                )}
              >
                Get Started for Free
              </Link>
            </CardContent>
          </Card>
          <Card className="bg-white shadow-md rounded-lg p-6">
            <CardHeader>
              <CardTitle>Premium</CardTitle>
              <CardDescription>
                Comprehensive marketing solution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold">$30</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mt-6 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Brand creation
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Custom content creation
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Target audience research
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Social media management
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Email marketing campaigns
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Advanced SEO optimization
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Growth hacking strategies
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-2 h-5 w-5 text-blue-600" />
                  Competitor analysis
                </li>
              </ul>
              <Link
                href="/dashboard"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "mt-6 w-full"
                )}
              >
                Get Started for Free
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
