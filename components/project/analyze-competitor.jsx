import { BadgePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import OverlayLoader from "@/components/loader/overlay";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { mixpanelTrack } from "@/lib/mixpanel";

export function AnalyzeCompetitor({ project, setProject }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const onGenerate = async () => {
    setIsGenerating(true);

    mixpanelTrack("Analyze Competitor");

    await fetch("/api/project/competitor/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: project.id,
        name: project.name,
        audience: project.audience,
        summary: project.summary,
        competitor: project.competitor
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsGenerating(false);
        if (!data.status) {
          toast({
            variant: "destructive",
            description:
              "Error occured while generating your analyzing your competitor. Please try again.",
          });
          return;
        }

        toast({
          description:
            "Your competitor analysis has been generated successfully.",
        });

        setProject(data.data);
      });
  };

  return (
    <div className="mx-auto max-w-[500px] w-full mt-5 relative">
      <div className="text-center border border-gray-800 border-dashed rounded-lg py-14 px-3 font-medium">
        <h2 className="font-semibold mb-1 text-lg">
          Competitor Analysis not generated
        </h2>
        <p>Click on the button below to generate competitor analysis.</p>

        <Button className={"h-8 mt-3"} onClick={onGenerate}>
          <BadgePlus className="h-4 w-4 mr-1" />
          <span className="">Analyze Competitor</span>
        </Button>
      </div>

      {isGenerating && (
        <OverlayLoader>
          <p className="text-base text-gray-700 font-bold mb-1 mt-3">
            Conducting competitor analysis for your project.
          </p>
          <p className="text-sm text-gray-700 font-semibold">
            Relax and wait this might take up to a minute.
          </p>
        </OverlayLoader>
      )}
    </div>
  );
}
