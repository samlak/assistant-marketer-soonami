import { EmptyChannel } from "../empty/channel";
import { ChannelContent } from "../content";
import useStore from '@/store/useStore';

export const ShortFormVideo = ({ findChannelRecommendation }) => {
  const { marketingStrategy } = useStore();

  return (
    <>
      { marketingStrategy.shorts ?
        <ChannelContent data={marketingStrategy.shorts}/>
      :
        <EmptyChannel
          channel="Short Form Video"
          channelRecommended={findChannelRecommendation("Short Form Video")}
        />
      }
    </>
  );
};
