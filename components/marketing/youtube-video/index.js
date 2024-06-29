import { EmptyChannel } from "../empty/channel";
import { ChannelContent } from "../content";
import useStore from '@/store/useStore';

export const YoutubeVideo = ({ findChannelRecommendation }) => {
  const { marketingStrategy } = useStore();
  
  return (
    <>
      { marketingStrategy.youtube ?
        <ChannelContent data={marketingStrategy.youtube}/>
      :
        <EmptyChannel
          channel="Youtube Video"
          channelRecommended={findChannelRecommendation("Youtube Video")}
        />
      }
    </>
  );
};
