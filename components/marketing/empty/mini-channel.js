import { useState } from 'react';
import { Card }  from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import OverlayLoader from "@/components/loader/overlay";
import { toast } from "@/components/ui/use-toast";
import { mixpanelTrack } from "@/lib/mixpanel";
import useStore from '@/store/useStore';

export const MiniChannel = ({ 
  ratedChannel, 
  channelDescription,
  disableGeneration,
  setDisableGeneration,
  setSelectedChannel 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { setMarketingStrategy, project } = useStore();

  const generateStrategy = async () => {
    setIsGenerating(true);
    setDisableGeneration(true);

    mixpanelTrack("Generate Marketing Strategy", {
      channel: ratedChannel.channel,
      component: "Mini Channel"
    });

    await fetch("/api/marketing/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: ratedChannel.channel,
        projectName: project.name,
        audience: project.audience,
        projectDescription: project.summary,
        projectId: project.id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsGenerating(false);
        setDisableGeneration(false);

        if (!data.status) {
          toast({
            variant: "destructive",
            description:
              "Error occured while generating marketing strategy. Please try again.",
          });
          return;
        }

        toast({
          description:
            "Marketing strategy generated successfully.",
        });

        setMarketingStrategy(data.data)

        setSelectedChannel(ratedChannel.channel) 
      });
  };

  return (
    <Card 
      className={`bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:-translate-y-1 relative ${
        ratedChannel.recommended ? 'border-2 border-primary/80' : ''
      }`}
    >
      {ratedChannel.recommended && (
        <span className="absolute top-0 right-0 bg-primary/80 text-white text-xs font-bold px-2 py-1 rounded-bl">
          Recommended
        </span>
      )}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{ratedChannel.channel}</h2>
      <p className="text-gray-600 mb-4">{channelDescription}</p>

      <Button 
        disabled={disableGeneration}
        onClick={generateStrategy}
        className="text-white font-bold px-3 h-8 transition duration-300"
      >
        Generate Strategy
      </Button>

      { isGenerating && (
        <OverlayLoader>
          <p className="text-[15px] text-gray-700 font-semibold mb-1 mt-3">
            {`Generating marketing strategy.`}
          </p>
          <p className="text-xs text-gray-700 font-medium">
            Relax and wait this might take up to a minute.
          </p>
        </OverlayLoader>
      )}
    </Card>
         
  );
};

