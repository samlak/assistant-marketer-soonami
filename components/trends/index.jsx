import { Card } from "@/components/ui/card";
import useStore from '@/store/useStore';
import { NoStrategyFound } from "./no-strategy-found";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Trends({ setActiveTab }) {
  const { marketingStrategy } = useStore();

  const generateStrategy = () => {
    setActiveTab("marketing")
  }

  function encodeToUrl(text) {
    return encodeURIComponent(text);
  }

  const hashRemoval = (hashtags) => {
    return hashtags.map((hashtag) => {
      const plainTag = hashtag.replace(/#/g, '');
      return plainTag;
    })
  }

  const channelTrends = marketingStrategy ? [
    {
      name: "Twitter(X)",
      content: [
        {
          title: "Trending Tweet:",
          data: !marketingStrategy.twitter ? [] : marketingStrategy.twitter.option.hashtag,
          url: [
            "https://x.com/search?q=",
            "&src=recent_search_click"
          ],
          prefix: "Trending in "
        },
        {
          title: "Popular Account:",
          data: !marketingStrategy.twitter ? [] : marketingStrategy.twitter.option.hashtag,
          url: [
            "https://x.com/search?q=",
            "&src=recent_search_click&f=user"
          ],
          prefix: "Popular in "
        },
      ],
      generated: marketingStrategy.twitter ? true : false
    },
    {
      name: "Facebook",
      content: [
        {
          title: "Relevant Group:",
          data: marketingStrategy.community && marketingStrategy.community.option.facebook_group ? marketingStrategy.community.option.facebook_group : [],
          url: [
            "https://web.facebook.com/search/groups?q=",
            ""
          ],
          prefix: ""
        },
        {
          title: "Latest Post:",
          data: !marketingStrategy.shorts ? [] : marketingStrategy.shorts.option.hashtag,
          url: [
            "https://web.facebook.com/search/posts/?q=",
            ""
          ],
          prefix: "Latest in "
        },
      ],
      generated: marketingStrategy.community && marketingStrategy.shorts ? true : false
    },
    {
      name: "Instagram",
      content: [
        {
          title: "Relevant Post:",
          data: !marketingStrategy.shorts ? [] : hashRemoval(marketingStrategy.shorts.option.hashtag),
          url: [
            "https://www.instagram.com/explore/tags/",
            ""
          ],
          prefix: "Post in #"
        }
      ],
      generated: marketingStrategy.shorts ? true : false
    },
    {
      name: "LinkedIn",
      content: [
        {
          title: "Relevant Posts:",
          data: !marketingStrategy.linkedin ? [] : marketingStrategy.linkedin.option.hashtag,
          url: [
            "https://www.linkedin.com/search/results/content/?keywords=",
            "&origin=SWITCH_SEARCH_VERTICAL&sid=LBX"
          ],
          prefix: "Post in "
        },
      ],
      generated: marketingStrategy.linkedin ? true : false
    },
    {
      name: "TikTok",
      content: [
        {
          title: "Related Video:",
          data: !marketingStrategy.shorts ? [] : marketingStrategy.shorts.option.hashtag,
          url: [
            "https://www.tiktok.com/search/video?q=",
            ""
          ],
          prefix: "Trending in "
        },
        {
          title: "Popular Account:",
          data: !marketingStrategy.shorts ? [] : marketingStrategy.shorts.option.hashtag,
          url: [
            "https://www.tiktok.com/search/user?q=",
            ""
          ],
          prefix: "Popular in "
        },
      ],
      generated: marketingStrategy.shorts ? true : false
    },
    {
      name: "Reddit",
      content: [
        {
          title: "Relevant Subreddit:",
          data: marketingStrategy.community && marketingStrategy.community.option.subreddit ? marketingStrategy.community.option.subreddit : [],
          url: [
            "https://www.reddit.com/search/?q=",
            "&type=sr"
          ],
          prefix: ""
        }
      ],
      generated: marketingStrategy.community ? true : false
    },
    {
      name: "Youtube",
      content: [
        {
          title: "Relevant Video:",
          data: !marketingStrategy.youtube ? [] : marketingStrategy.youtube.option.keyword,
          url: [
            "https://www.youtube.com/results?search_query=",
            "&sp=EgIQAQ%253D%253D"
          ],
          prefix: "Video in "
        },
        {
          title: "Popular Channel:",
          data: !marketingStrategy.youtube ? [] : marketingStrategy.youtube.option.keyword,
          url: [
            "https://www.youtube.com/results?search_query=",
            "&sp=EgIQAg%253D%253D"
          ],
          prefix: "Channel in "
        },
      ],
      generated: marketingStrategy.youtube ? true : false
    },
    {
      name: "Search Engine Optimization (SEO)",
      content: [
        {
          title: "Relevant Keywords:",
          data: !marketingStrategy.seo ? [] : marketingStrategy.seo.option.keyword,
          url: [
            "https://tools.wordstream.com/fkt?website=",
            "&cid=&camplink=&campname=&geoflow=1"
          ],
          prefix: ""
        },
      ],
      generated: marketingStrategy.seo ? true : false
    },
  ] : []
  
  return (
    <section className="">
      { marketingStrategy ?
        <>
          <Card className="w-full px-3 mb-4">
            <div className={"py-3 text-sm"}>
              <p>
                Welcome to Trends, your go-to resource for the latest developments and insights in your niche. 
                Based on the marketing strategy you generated earlier, utilize this information to create compelling content, effectively engage your audience, and elevate your marketing success. 
                Explore trending keywords, popular topics, and valuable data to make informed decisions and achieve outstanding results.
              </p>

              <p className="mt-2">
                <span 
                  className="text-primary cursor-pointer hover:underline" 
                  onClick={generateStrategy}
                >
                  Generate marketing strategy
                </span>{" "}
                for more channel to see more trend data.
              </p>
            </div>
          </Card>

          <div className="columns-1 md:columns-2 gap-4">
            { channelTrends.map((channel, channelKey) => channel.generated && (
              <Card key={channelKey} className="w-full px-3 break-inside-avoid mb-4">
                <div className="border-b -mx-3 px-3 py-1.5">
                  <h2 className="font-bold"> {channel.name}  </h2>
                </div>
                <div className="my-3 text-sm">
                { channel.content.map((content, contentKey) => (
                  <div className="mb-2" key={contentKey}>
                    <p className="font-semibold">
                      {content.title}
                    </p>
                          
                    <ul className="mt-2 list-disc ml-5">
                      {content.data.map((hashkey, hashKey ) => (
                        <li className="" key={hashKey}>
                          <Link
                            href={`${content.url[0]}${encodeToUrl(hashkey)}${content.url[1]}`}
                            target={"_blank"}
                            className={"text-primary underline hover:font-semibold flex items-center"}
                          >
                            <ArrowUpRight className="h-4 w-4" />
                            {`${content.prefix}${hashkey}`} 
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                </div>
              </Card>
            ))}
          </div>
        </>
      : 
        <NoStrategyFound generateStrategy={generateStrategy} /> 
      }

    </section>
  );
}
