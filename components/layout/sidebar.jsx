import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

export function Sidebar({ menuItems, activeMenu }) {
  return (
    <div className="hidden border-r bg-muted/40 md:block relative">
      <div className="flex h-full md:w-[220px] lg:w-[240px] fixed max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
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

        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            { menuItems.map((item, key) => 
              <Link
                key={key}
                href={item.link}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-muted",
                  activeMenu === item.name && "text-primary bg-muted"
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            )}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle className="text-xl">Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
                <TrendingUp className="ml-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}