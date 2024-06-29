import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NoStrategyFound({ generateStrategy }) {
  
  return (
    <section className="container">
      <div className="mx-auto max-w-[500px] w-full mt-8">
        <div className="text-center border border-gray-800 border-dashed rounded-lg py-10 px-3 font-medium">
          <h2 className="font-semibold text-2xl">Trends not activated.</h2>
          <p className="mb-2 mt-4">
            Marketing strategy is required to see trends. <br />
            Click the button below to generate your marketing strategy.
          </p>

          <Button
            className="h-8 mt-3"
            onClick={generateStrategy}
          >
            <PlusCircle className="h-4 w-4 mr-1" />
            <span className="">Generate Marketing Strategy</span>
          </Button>
        </div>
      </div>
    </section>
  );
}