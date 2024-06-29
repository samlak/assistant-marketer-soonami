import { EmptyChannel } from "../empty/channel";
import { ChannelContent } from "../content";
import useStore from '@/store/useStore';

export const CommunityAndForum = ({ findChannelRecommendation }) => {
  const { marketingStrategy } = useStore();

  return (
    <>
      { marketingStrategy.community ?
        <ChannelContent data={marketingStrategy.community}/>
      :
        <EmptyChannel
          channel="Community and Forum"
          channelRecommended={findChannelRecommendation("Community and Forum")}
        />
      }
    </>
  );
};
