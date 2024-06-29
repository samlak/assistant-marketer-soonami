import Link from "next/link"
import {
  CircleUser,
  User,
  TrendingUp,
  LogOut,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { createClient } from "@/supabase/utils/component";
import { useRouter } from 'next/router';
import { toast } from "@/components/ui/use-toast";

export function Layout({ user, children }) {
  const supabase = createClient()
  const router = useRouter()

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) {
      toast({
        title: "Sign out is unsuccessful",
        description: (
          <strong> { error.message } </strong>
        ),
      });
      return ;
    }
    router.push('/login')
  }

  return (
    <div className="min-h-screen w-full">

      <div className="flex flex-col pt-14">
        <div className="fixed bg-white top-0 right-0 w-full z-10">
          <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 w-full">
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

            <div className="flex">
              <Button size="sm" className=" mr-3">
                Upgrade
                <TrendingUp className="ml-1 h-4 w-4" />
              </Button>
              
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
                        { user.name }
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        { user.email }
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

            </div>
          </header>
        </div>

        { children }
        
      </div>
    </div>
  )
}
