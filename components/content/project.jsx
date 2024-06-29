import { Button } from "@/components/ui/button"
import { Card }  from "@/components/ui/card"
import { ViewContent } from "@/components/content";
import { EmptyContent } from "./empty-content";
import { 
  CirclePlus, 
} from "lucide-react";

export function ProjectContent({ contents, activateNewContent }) {
  

  return (
    <section className="mt-3">
      { contents.length ?
        <Card className="w-full px-3 mb-4">
          <div>
            <div className="border-b -mx-3 px-3 py-2">
              <div className="flex justify-between">
                <h2 className="font-semibold text-lg">Contents</h2>
                <Button
                  onClick={activateNewContent}
                  variant={"outline"}
                  className="h-7 px-3 border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <CirclePlus className="h-4 w-4 mr-1" />
                  <span> New Content </span>
                </Button>
              </div>
            </div>
            <div className={"py-3"}>
              { contents.map((content, key) => ( 
                <Card
                  key={key}
                  className="w-full px-3 mb-4"
                >
                  <div className="border-b -mx-3 px-3 py-1">
                    <div className="flex justify-between items-center">
                      <h2 className="font-semibold">{content.channel} Post</h2>
                      <ViewContent content={content} />
                    </div>
                  </div>
                  <p className="text-sm py-3">
                    {content.text.substring(0, 350)+"..."}
                  </p>
                </Card>
              ))}
            </div>
          </div>

        </Card>
      : 
        <EmptyContent activateNewContent={activateNewContent} />
      }
    </section>
  );
}
