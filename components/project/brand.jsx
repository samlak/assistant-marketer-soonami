import { Card } from "@/components/ui/card";
import { Regenerate } from "@/components/project";

export function Brand({ project, setActiveTab, setProject }) {

  const analyzeCompetitor = () => {
    setActiveTab("competitors")
  }

  return (
    <section className="mt-3">
      <Card className="w-full px-3 mb-4">
        <div className="border-b -mx-3 px-3 py-2">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">{project.name}</h2>
            <Regenerate type="brand" />
          </div>
        </div>
        <div className={"py-3 text-sm"}>
          <p>
            {project.overview}
          </p>
          <p className="mt-2">
            <span 
              className="text-primary cursor-pointer hover:underline" 
              onClick={analyzeCompetitor}
            >
              Generate your competitor analysis
            </span>{" "}
            to know your competitors and see where you stand in the market.
          </p>
        </div>
      </Card>

      <Card className="w-full px-3 mb-4">
        <div className="border-b -mx-3 px-3 py-2">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Customer Personas</h2>
            <Regenerate type="brand" />
          </div>
        </div>
      </Card>

      <div className="columns-1 md:columns-2 gap-4">
        { project.personas.map((persona, index) => (
          <Card key={index} className="w-full px-3 break-inside-avoid mb-4">
            <div className="border-b -mx-3 px-3 py-1.5">
              <h2 className="font-bold"> {persona.name} - {persona.age} years  </h2>
            </div>
            <div className="my-3 text-sm">
              <div className="mb-2">
                <p className="my-2">
                  <span className="font-semibold">Job: </span>
                  {persona.occupation}
                </p>
                <p className="my-2">
                  <span className="font-semibold">Likes: </span>
                  {persona.likes}
                </p>
                <p className="my-2">
                  <span className="font-semibold">Pain: </span>
                  {persona.pain}
                </p>
                <p className="my-2">
                  <span className="font-semibold">Desire: </span>
                  {persona.desire}
                </p>
                <p className="my-2">
                  <span className="font-semibold">Current Situation: </span>
                  {persona["current situation"]}
                </p>
                <p className="my-2">
                  <span className="font-semibold">Where you can find them: </span>
                  {persona["where can you find"]}
                </p>
              </div>
            </div>
          </Card>
        ))}

      </div>
    </section>
  );
}
