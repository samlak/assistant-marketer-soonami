import { useState } from 'react';
import { Card }  from "@/components/ui/card";
import { MiniChannel } from './mini-channel';

const marketingChannels = {    
  "Short Form Video": {
    description: "Engage younger audiences and boost visibility using short videos on TikTok, YouTube Shorts, and Instagram Reels."   
  },    
  "SEO": {
    description: "Optimize your website and content to improve search engine rankings and drive organic traffic."   
  },    
  "Youtube Video": {
    description: "Create in-depth video content to build authority and foster engagement with your audience."   
  },    
  "Twitter": {
    description: "Share bite-sized content and participate in real-time conversations with your audience." 
  },    
  "Community and Forum": {
    description: "Participate in relevant Subreddits and Facebook groups to foster strong community connections." 
  },    
  "LinkedIn": {
    description: "Connect with professionals and enhance your brand's presence in the business world." 
  }
}

export const EmptyStrategy = ({ 
  recommendedChannelRating,
  setSelectedChannel
}) => {
  const [disableGeneration, setDisableGeneration] = useState(false);

  const generateStrategy = (channelName) => {
    
  };

  return (
    <Card className="p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Marketing Strategies by Channel
        </h2>
        
        <div className="border-l-4 bg-primary/10 border-primary/70  p-4 mb-8 rounded">
          <p className="text-sm text-[15px]">
            <span className="font-bold">Note: </span>
            The recommended channels are based on your project information and are expected to bring the best results. 
            Focus on these channels for optimal marketing performance. <span className="font-bold"> Click on Generate Strategy </span> to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedChannelRating.map((ratedChannel, index) => (
            <MiniChannel 
              key={index}
              ratedChannel={ratedChannel}
              channelDescription={marketingChannels[ratedChannel.channel].description}
              disableGeneration={disableGeneration}
              setDisableGeneration={setDisableGeneration}
              setSelectedChannel={setSelectedChannel}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

