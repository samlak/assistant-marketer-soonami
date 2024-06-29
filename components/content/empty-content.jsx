import { BadgePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyContent({ activateNewContent }) {
  return (
    <div className="mx-auto max-w-[500px] w-full mt-5 relative">
      <div className="text-center border border-gray-800 border-dashed rounded-lg py-14 px-3 font-medium">
        <h2 className="font-semibold mb-1 text-lg">
          No content generated yet
        </h2>
        <p>Click on the button below to generate new content.</p>

        <Button className={"h-8 mt-3"} onClick={activateNewContent}>
          <BadgePlus className="h-4 w-4 mr-1" />
          <span className="">Generate New Content</span>
        </Button>
      </div>
    </div>
  );
}
