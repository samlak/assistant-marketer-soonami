import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card";

export function ProjectLoader() {
  
  return (
    <div className="w-full">
      <Card className="mb-4">
        <Skeleton 
          className="w-full h-[150px] bg-blue-200" 
        />
      </Card>
      <div className="flex justify-between flex-wrap">
        { Array(10).fill(null).map((_, index) => (
          <Card className="mb-4 md:w-[calc(50%-10px)] w-full" key={index}>
            <Skeleton 
              className="h-[250px] bg-blue-200" 
            />
          </Card>
        ))}
      </div>
    </div>
  );
}
