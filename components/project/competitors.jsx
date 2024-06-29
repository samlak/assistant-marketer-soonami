import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card }  from "@/components/ui/card"
import { Regenerate } from "@/components/project";
import { AnalyzeCompetitor } from "./analyze-competitor";
import { ArrowUpRight } from "lucide-react";

export function Competitors({ project, setProject, setActiveTab }) {
  const competitorData = project.competitor_analysis

  const generateStrategy = () => {
    setActiveTab("marketing")
  }

  return (
    <section className="mt-3">
      { competitorData ?
        <>
          <Card className="w-full px-3 mb-4">
            <div className="border-b -mx-3 px-3 py-2">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">Competitor Overview</h2>
                <Regenerate type="competitor" />
              </div>
            </div>
            <div className={"py-3 text-sm"}>
              <p>
                {competitorData.overview}
              </p>
              <p className="mt-2">
                <span 
                  className="text-primary cursor-pointer hover:underline" 
                  onClick={generateStrategy}
                >
                  Generate marketing strategy
                </span>{" "}
                to see how you can promote your brand.
              </p>
            </div>
          </Card>

          <div className="columns-1 md:columns-2 gap-4">
            { competitorData.competitors.map((competitor, index) => (
              <Card key={index} className="w-full px-3 break-inside-avoid mb-4">
                <div className="border-b -mx-3 px-3 py-1.5">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold"> {competitor.competitorName}  </h2>

                    <Link
                      href={competitor.competitorUrl}
                      target="_blank"
                      className={cn(
                        buttonVariants({ variant: "outline" }),
                        "h-7 px-2 text-sm border-primary hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      Visit
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
                <div className="my-3 text-sm">
                  <div className="mb-2">
                    <p className="my-2">
                      {competitor.competitorSummary}
                    </p>

                    <div className="my-3 text-sm">
                      <p className="font-semibold"> Strength: </p>
                      <ul className="mt-2 list-disc ml-5">
                        {competitor.competitorPros.map((value, key ) => (
                          <li className="" key={key}>{value}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="my-3 text-sm">
                      <p className="font-semibold"> Weakness: </p>
                      <ul className="mt-2 list-disc ml-5">
                        {competitor.competitorCons.map((value, key ) => (
                          <li className="" key={key}>{value}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="my-3 text-sm">
                      <p className="font-semibold"> Suggestions: </p>
                      <ul className="mt-2 list-disc ml-5">
                        {competitor.suggestions.map((value, key ) => (
                          <li className="" key={key}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </> 
      :
        <AnalyzeCompetitor 
          project={project}
          setProject={setProject}
        />
      }
    </section>
  );
}
