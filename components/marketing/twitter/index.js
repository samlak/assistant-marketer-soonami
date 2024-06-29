import { EmptyChannel } from "../empty/channel";
import { ChannelContent } from "../content";
import useStore from '@/store/useStore';

export const Twitter = ({ findChannelRecommendation }) => {
  const { marketingStrategy } = useStore();

  return (
    <>
      { marketingStrategy.twitter ?
        <ChannelContent data={marketingStrategy.twitter} />
      :
        <EmptyChannel
          channel="Twitter"
          channelRecommended={findChannelRecommendation("Twitter")}
        />
      }
    </>
  );
};
