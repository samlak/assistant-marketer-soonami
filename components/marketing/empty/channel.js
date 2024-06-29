import { useState } from 'react';
import { Card }  from "@/components/ui/card";
import OverlayLoader from "@/components/loader/overlay";
import { toast } from "@/components/ui/use-toast";
import { mixpanelTrack } from "@/lib/mixpanel";
import useStore from '@/store/useStore';

export const EmptyChannel = ({ 
  channel,
  channelRecommended 
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { marketingStrategy, setMarketingStrategy, project } = useStore();

  const generateStrategy = async () => {
    setIsGenerating(true);

    mixpanelTrack("Generate Marketing Strategy", {
      channel: channel,
      component: "Large Channel"
    });

    await fetch("/api/marketing/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        channel: channel,
        projectName: project.name,
        audience: project.audience,
        projectDescription: project.summary,
        marketingId: marketingStrategy.id
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsGenerating(false);

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
      });
  };

  const allChannelData = {    
    "Short Form Video": {
      "heading": "Short Form Video Marketing Strategy Generator",
      "text": "Generate effective strategies for TikTok, YouTube Shorts, and Instagram Reels to boost your brand's visibility and engagement.",
      "why": [
        "Engage with younger audiences effectively",
        "Increase brand visibility through viral potential",
        "Leverage platform-specific trends for growth",
        "Create snackable, easily consumable content",
        "Boost user engagement and interaction"
      ]
    },    
    "SEO": {
      "heading": "Search Engine Optimization Strategy Creator",
      "text": "Develop comprehensive SEO strategies to improve your website's visibility and ranking on search engine results pages.",
      "why": [
        "Increase organic traffic to your website",
        "Improve website authority and credibility",
        "Target specific keywords relevant to your business",
        "Enhance user experience through optimized content",
        "Stay ahead of search engine algorithm updates"
      ]
    },    
    "Youtube Video": {
      "heading": "Youtube Video Content Strategy Planner",
      "text": "Create engaging long-form video content strategies for Youtube to build a loyal audience and establish your brand as an authority.",
      "why": [
        "Develop in-depth, valuable content for viewers",
        "Leverage YouTube's powerful search and recommendation algorithms",
        "Build a community around your brand through comments and discussions",
        "Monetize your content through ads and sponsorships",
        "Showcase products or services in detail"
      ]
    },    
    "Twitter": {
      "heading": "Twitter Marketing Campaign Generator",
      "text": "Design impactful Twitter marketing campaigns to increase brand awareness, engage with your audience, and drive conversations.",
      "why": [
        "Participate in real-time conversations and trending topics",
        "Reach a wide, diverse audience quickly",
        "Foster direct engagement with customers and followers",
        "Share bite-sized updates and news efficiently",
        "Utilize hashtags for increased visibility and campaign tracking"
      ]
    },    
    "Community and Forum": {
      "heading": "Community and Forum Engagement Strategy Generator",
      "text": "Participate in relevant Subreddits and Facebook groups to foster strong community connections and enhance your brand's online presence.",
      "why": [
        "Engage with highly targeted, interest-based communities",
        "Build brand credibility through authentic interactions",
        "Gain valuable insights into customer needs and preferences",
        "Increase brand visibility within niche markets",
        "Drive traffic to your website through helpful contributions"
      ]
    },    
    "LinkedIn": {
      "heading": "LinkedIn B2B Marketing Plan Creator",
      "text": "Generate effective B2B marketing strategies for LinkedIn to expand your professional network, establish thought leadership, and drive business growth.",
      "why": [
        "Target decision-makers and professionals in your industry",
        "Showcase company culture and attract top talent",
        "Share industry insights and establish thought leadership",
        "Generate high-quality leads for B2B sales",
        "Leverage LinkedIn's powerful targeting and advertising tools"
      ]
    }
  }

  return (
    <div className="sm:p-8 py-6">
      <div 
        className={`max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden relative ${
          channelRecommended ? 'border-2 border-primary/80' : ''
        }`}
      >
        { channelRecommended &&
          <span className="absolute top-0 right-0 bg-primary/80 text-white text-xs font-bold px-2 py-1 rounded-bl">
            Recommended
          </span>
        }

        <Card className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            { allChannelData[channel].heading }
          </h1>
          <p className="text-gray-600 text-center mb-8">
            { allChannelData[channel].text }
          </p>
          
          <div className="border-l-4 bg-primary/10 border-primary/70 p-4 mb-8 rounded">
            <h2 className="text-xl font-semibold mb-2">{`Why ${channel}?`}</h2>
            <ul className="list-disc list-inside space-y-1">
              { allChannelData[channel].why.map((why, key) => (
                <li key={key}>{why}</li>
              ))}
            </ul>
          </div>
          
          <button 
            onClick={generateStrategy}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Generate Strategy
          </button>
        </Card>

        { isGenerating && (
          <OverlayLoader>
            <p className="text-base text-gray-700 font-bold mb-1 mt-3">
              {`Generating ${channel} marketing strategy for your project.`}
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              Relax and wait this might take up to a minute.
            </p>
          </OverlayLoader>
        )}
      </div>
    </div>
  );
};
