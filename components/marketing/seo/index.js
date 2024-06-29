import { EmptyChannel } from "../empty/channel";
import { ChannelContent } from "../content";
import useStore from '@/store/useStore';

export const SEO = ({ findChannelRecommendation }) => {
  const { marketingStrategy } = useStore();

  return (
    <>
      { marketingStrategy.seo ?
        <ChannelContent data={marketingStrategy.seo}/>
      :
        <EmptyChannel
          channel="SEO"
          channelRecommended={findChannelRecommendation("SEO")}
        />
      }
    </>
  );
};
