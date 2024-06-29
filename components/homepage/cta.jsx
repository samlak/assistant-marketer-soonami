import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
  return (
    <section className="px-6 py-12 bg-[#E9EFFD]" id="cta">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center space-y-6 md:text-left">
            <h1 className="md:text-4xl text-2xl font-bold">Automate Your Marketing with Assistant Marketer</h1>
            <p className="md:text-lg text-base">
              Assistant Marketer is the ultimate tool for early-stage founders looking to streamline their marketing efforts and achieve better results.
              It takes the hassle out of your marketing tasks, freeing you up to focus on growing your business.
            </p>
            <Button 
              className="bg-blue-600 text-white"
              asChild
            >
              <Link href="/dashboard">
                Get Started →
              </Link>
            </Button>
          </div>
          <div className="hidden md:block">
            <img
              alt="Automate Your Marketing with Assistant Marketer"
              className="rounded-lg"
              height="400"
              src="/og_image.png"
              style={{
                aspectRatio: "600/420",
                objectFit: "cover",
              }}
              width="600"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
