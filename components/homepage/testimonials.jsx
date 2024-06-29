import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import Link from "next/link";

export function Testimonials() {
  return (
    <section className="px-6 py-12 bg-gray-100" id="testimonials">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white">
            <CardContent className="py-4">
              <p className="text-sm text-gray-600">
                "Assistant Marketer has been a game-changer for my early-stage
                startup. The AI-powered platform handles all our marketing
                tasks, from social media to email campaigns. This has freed up
                so much time for me to focus on product development and growing
                the business."
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pb-3 pt-2">
              <p className="text-xs font-semibold">Laura S.</p>
              <Avatar>
                <AvatarImage
                  alt="Laura S."
                  src="/placeholder.svg?height=40&width=40"
                />
              </Avatar>
            </CardFooter>
          </Card>

          <Card className="bg-white">
            <CardContent className="py-4">
              <p className="text-sm text-gray-600">
                "As a busy founder, I was struggling to keep up with all the
                marketing tasks. Assistant Marketer has been a lifesaver. The
                platform's AI-driven insights and automation have helped us
                achieve better results with less effort. I highly recommend it
                to any early-stage founder."
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pb-3 pt-2">
              <p className="text-xs font-semibold">Jason H.</p>
              <Avatar>
                <AvatarImage
                  alt="Jason H."
                  src="/placeholder.svg?height=40&width=40"
                />
              </Avatar>
            </CardFooter>
          </Card>

          <Card className="bg-white">
            <CardContent className="py-4">
              <p className="text-sm text-gray-600">
                "I was hesitant to hand over my marketing to an AI platform at
                first, but Assistant Marketer has exceeded my expectations. The
                team is responsive, and the platform's performance has been
                impressive. I can now focus on product development while
                Assistant Marketer takes care of our marketing needs."
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pb-3 pt-2">
              <p className="text-xs font-semibold">David M.</p>
              <Avatar>
                <AvatarImage
                  alt="David M."
                  src="/placeholder.svg?height=40&width=40"
                />
              </Avatar>
            </CardFooter>
          </Card>
        </div>
        <div className="text-center mt-6">
          <Link className="text-blue-600 hover:underline" href="/dashboard">
            View more testimonials →
          </Link>
        </div>
      </div>
    </section>
  );
}
