import { useState } from 'react';
import { Card }  from "@/components/ui/card";
import ChannelRating from "@/lib/channel-rating";
import { EmptyStrategy } from './empty/strategy';
import { ShortFormVideo } from './short-form-video';
import { CommunityAndForum } from './community-and-forum';
import { LinkedIn } from './linkedin';
import { SEO } from './seo';
import { Twitter } from './twitter';
import { YoutubeVideo } from './youtube-video';
import { SwitchChannel } from './switch-channel';
import useStore from '@/store/useStore';
import { Regenerate } from "@/components/project";

export const MarketingStrategy = ({ model }) => {
  const {
    marketingStrategy,
  } = useStore();
  const recommendedChannelRating = ChannelRating[model];

  const [ selectedChannel, setSelectedChannel ] = useState(recommendedChannelRating[0].channel)

  const findChannelRecommendation = (channelName) => {
    const ratedChannel = recommendedChannelRating.find(channel => channel.channel === channelName);
    return ratedChannel.recommended;
  }

  const channelData = {
    "Short Form Video": {
      component: <ShortFormVideo findChannelRecommendation={findChannelRecommendation} />,
      shortCode: "shorts"
    },
    "SEO": {
      component: <SEO findChannelRecommendation={findChannelRecommendation} />,
      shortCode: "seo"
    },
    "Youtube Video": {
      component: <YoutubeVideo findChannelRecommendation={findChannelRecommendation} />,
      shortCode: "youtube"
    },
    "Twitter": {
      component: <Twitter findChannelRecommendation={findChannelRecommendation} />,
      shortCode: "twitter"
    },
    "Community and Forum": {
      component: <CommunityAndForum findChannelRecommendation={findChannelRecommendation} />,
      shortCode: "community"
    },
    "LinkedIn": {
      component: <LinkedIn findChannelRecommendation={findChannelRecommendation} />,
      shortCode: "linkedin"
    },
  }

  const channels = recommendedChannelRating.map(channel => channel.channel);

  return (
    <div>
      { marketingStrategy ?
        <>
          <Card className="w-full px-3">
            <div className={`-mx-3 px-3 py-2`}>
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{selectedChannel}</h2>
                <div className="flex items-center">
                  <Regenerate 
                    type="strategy"
                    channel={selectedChannel}
                  />

                  <SwitchChannel
                    channels={channels}
                    selectedChannel={selectedChannel}
                    setSelectedChannel={setSelectedChannel}
                  />
                </div>
              </div>
            </div>
          </Card>

          { channelData[selectedChannel].component }
        </>
      :
        <EmptyStrategy 
          recommendedChannelRating={recommendedChannelRating} 
          setSelectedChannel={setSelectedChannel}
        />
      }
    </div>
  );
};

