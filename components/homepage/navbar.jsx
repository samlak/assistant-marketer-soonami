import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { MenuIcon } from "@/components/icon";
import Image from "next/image";

export function Navbar() {
  return (
    <nav className="bg-white border-b py-3" id="navbar">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="font-bold text-xl">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image
              src="/logo.png"
              width={70}
              height={70}
              alt="Assistant Marketer"
              className="h-7 w-7"
            />
            <div className="flex flex-col text-sm items-start justify-center">
              <div className="text-primary">Assistant </div>
              <div className="-mt-2">Marketer</div>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4 lg:space-x-4">
          <div className="lg:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link
                    className="text-gray-600 hover:text-gray-800"
                    href="/#navbar"
                  >
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="text-gray-600 hover:text-gray-800"
                    href="/#feature"
                  >
                    Features
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="text-gray-600 hover:text-gray-800"
                    href="/#pricing"
                  >
                    Pricing
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="text-gray-600 hover:text-gray-800"
                    href="/#faq"
                  >
                    FAQ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="text-blue-600 hover:text-blue-700"
                    href="/register"
                  >
                    Register
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="hidden lg:flex items-center space-x-4 font-semibold">
            <Link className="text-gray-600 hover:text-gray-800" href="/#navbar">
              Home
            </Link>
            <Link
              className="text-gray-600 hover:text-gray-800"
              href="/#feature"
            >
              Features
            </Link>
            <Link
              className="text-gray-600 hover:text-gray-800"
              href="/#pricing"
            >
              Pricing
            </Link>
            <Link className="text-gray-600 hover:text-gray-800" href="/#faq">
              FAQ
            </Link>
            <Button
              asChild
              variant={"outline"}
              className="border-blue-600 text-base"
            >
              <Link
                className="text-blue-600 hover:text-blue-700"
                href="/register"
              >
                Register
              </Link>
            </Button>
          </div>
          <Button className="bg-blue-600 text-white hover:bg-blue-700" asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
