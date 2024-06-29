import {
  CircleUser,
  Menu,
  User,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { SwitchProject } from "./switch-project";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import useStore from '@/store/useStore';

export function Navbar({ menuItems, signOut, activeMenu }) {
  const { 
    userData,  
    layoutLoading,
  } = useStore();

  return (
    <div className="fixed bg-white top-0 right-0 md:left-[220px] lg:left-[240px] md:w-[unset] w-full z-50">
      <header className="flex h-14 items-center md:justify-end justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
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
              { menuItems.map((item, key) => 
                <Link
                  key={key}
                  href={item.link}
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted",
                    activeMenu === item.name && "text-foreground bg-muted",
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              )}
            </nav>
            <div className="mt-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our
                    support team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex sm:w-[300px] w-[200px]">
          <div className="sm:block hidden">
            <Button size="sm" className="w-[130px] mr-3">
              Upgrade
              <TrendingUp className="ml-1 h-4 w-4" />
            </Button>
          </div>

          { layoutLoading ?
            <div className="flex items-center justify-end flex-1">
              <Skeleton className="h-9 w-[120px] bg-blue-400 border mr-2" />
              <Skeleton className="h-10 w-10 rounded-full bg-blue-400 border" />
            </div>
          :
            <>
              <SwitchProject />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <CircleUser className="h-5 w-5 mx-2.5 text-primary" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        { userData.name }
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        { userData.email }
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link 
                      href={"/account"}
                      className="flex items-center w-full"
                    >
                      <User className="h-4 w-4 mr-1" />
                      Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onClick={signOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          }
        </div>
      </header>
    </div>
  )
}