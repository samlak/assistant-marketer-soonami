import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function ProjectNotFound() {
  
  return (
    <section className="container">
      <div className="mx-auto max-w-[500px] w-full mt-16">
        <div className="text-center border border-gray-800 border-dashed rounded-lg py-10 px-3 font-medium">
          <h2 className="font-semibold mb-1 text-lg">Project not found.</h2>
          <p>Click on the button below to create a new project.</p>

          <Link
            href="/project"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-8 mt-3"
            )}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            <span className="">Create New Project</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
