import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <header className="bg-blue-100" id="hero">
      <div className="container mx-auto flex flex-col items-center py-16 px-4 text-center">
        <h1 className="md:text-5xl text-3xl font-bold text-gray-800 max-w-[720px] mx-auto mb-6">
          {"A marketing assistant that helps you go from "}
          <span className="text-blue-600">0 to 10k users.</span>
        </h1>
        <p className="max-w-[700px] mx-auto text-base px-3">
          {
            "Get your first customer and build a strong online presence with ease. We handle "
          }
          <span className="font-semibold">
            market research, brand creation, social media, email marketing, and
            SEO
          </span>
          {
            " so that you can focus on your business. Let us drive your initial customer acquisition and promotion."
          }
        </p>
        <div className="mt-8 flex space-x-4">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 uppercase"
            asChild
          >
            <Link href="/dashboard">Get Started for Free</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
