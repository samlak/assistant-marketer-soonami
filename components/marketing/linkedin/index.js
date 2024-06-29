import { EmptyChannel } from "../empty/channel";
import { ChannelContent } from "../content";
import useStore from '@/store/useStore';

export const LinkedIn = ({ findChannelRecommendation }) => {
  const { marketingStrategy } = useStore();

  return (
    <>
      { marketingStrategy.linkedin ?
        <ChannelContent data={marketingStrategy.linkedin} />
      :
        <EmptyChannel
          channel="LinkedIn"
          channelRecommended={findChannelRecommendation("LinkedIn")}
        />
      }
    </>
  );
};
