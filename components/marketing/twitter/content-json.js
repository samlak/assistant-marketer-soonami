import { Card }  from "@/components/ui/card";
import Link from "next/link";

export const ChannelContent = ({ data }) => {
  const tools = [
    {
      name: "Tool 1",
      url: "/",
    },
    {
      name: "Tool 2",
      url: "/",
    },
    {
      name: "Tool 3",
      url: "/",
    },
    {
      name: "Tool 4",
      url: "/",
    },
    {
      name: "Tool 5",
      url: "/",
    },
  ]

  return (
    <div className="mt-3">
      <div className="columns-1 md:columns-2 gap-4">
        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Account Bio  </h2>
          </div>
          <div className="my-3 text-sm">
            {data.account_setup.bio}
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Profile Picture  </h2>
          </div>
          <div className="my-3 text-sm">
            {data.account_setup.profile_picture}
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Cover Photo  </h2>
          </div>
          <div className="my-3 text-sm">
            <p>{data.account_setup.cover_photo}</p>

            <p className="mt-1">
              <Link
                href="/"
                target={"_blank"}
                className={"text-primary hover:underline"}
              >
                Design your cover photo here
              </Link>
            </p>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Hashtags  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.hashtags.map((hashtag, key ) => (
                <li className="" key={key}>
                  <Link
                    href="/"
                    target={"_blank"}
                    className={"text-primary hover:underline"}
                  >
                    { hashtag }
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Popular account in your niche  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.hashtags.map((hashtag, key ) => (
                <li className="" key={key}>
                  <Link
                    href="/"
                    target={"_blank"}
                    className={"text-primary hover:underline"}
                  >
                    {`Popular in ${hashtag}`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Content Type  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.content_strategy.type.map((type, key ) => (
                <li className="" key={key}>
                  { type }
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Example Tweet  </h2>
          </div>
          <div className="my-3 text-sm">
            {data.content_strategy.content.map((content, key ) => (
              <p className="my-2.5" key={key}>
                { content }
              </p>
            ))}
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Trending Tweet in your niche  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.hashtags.map((hashtag, key ) => (
                <li className="" key={key}>
                  <Link
                    href="/"
                    target={"_blank"}
                    className={"text-primary hover:underline"}
                  >
                    {`Trending in ${hashtag}`}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Post Frequency </h2>
          </div>
          <div className="my-3 text-sm">
            <div className="mb-2">
              <p className="my-2">
                <span className="font-semibold">How often should I post? </span>
                {data.posting_frequency.frequency}
              </p>
              <div className="my-2">
                <p className="font-semibold">Best time to post: </p>
                <ul className="mt-1 list-disc ml-5">
                  {data.posting_frequency.best_posting_time.map((posting_time, key ) => (
                    <li className="my-0.5" key={key}>
                      {posting_time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Themed days and series ideas  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.themes_days_and_series.map((idea, key ) => (
                <li className="" key={key}>
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Tips to increase followers engagement  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.increase_followers_engagement.map((engagement, key ) => (
                <li className="" key={key}>
                  {engagement}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Platform features </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.platform_features.map((platform, key ) => (
                <li className="" key={key}>
                  {platform}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Recommended Tools  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {tools.map((tool, index) => (
                <li className="" key={index}>
                  <Link
                    href={tool.url}
                    target={"_blank"}
                    className={"text-primary hover:underline"}
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Card>

      </div>
    </div>
  );
};

