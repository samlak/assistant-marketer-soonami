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
            <h2 className="font-bold"> Channel Description  </h2>
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
            <h2 className="font-bold"> Channel Banner  </h2>
          </div>
          <div className="my-3 text-sm">
            <p>{data.account_setup.cover_photo}</p>

            <p className="mt-1">
              <Link
                href="/" 
                target="_blank"
                className={"text-primary hover:underline"}
              >
                Design your channel banner here
              </Link>
            </p>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Keywords  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.keywords.map((keyword, key ) => (
                <li className="" key={key}>
                  <Link
                    href="/" 
                    target="_blank"
                    className={"text-primary hover:underline"}
                  >
                    { keyword }
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Popular channel in your niche  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.keywords.map((keyword, key ) => (
                <li className="" key={key}>
                  <Link
                    href="/" 
                    target="_blank"
                    className={"text-primary hover:underline"}
                  >
                    {`Popular in ${keyword}`}
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
            <h2 className="font-bold"> Example Video  </h2>
          </div>
          <div className="my-3 text-sm">
            {data.content_strategy.content.map((content, key ) => (
              <p className="my-2.5" key={key}>
                <span className="font-semibold">{content.title}: </span>
                { content.description }
              </p>
            ))}
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Tips for a good Youtube video  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.content_tips.map((tip, key ) => (
                <li className="my-1" key={key}>
                  { tip }
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
                {data.posting_frequency_and_duration.frequency}
              </p>
              <p className="my-2">
                <span className="font-semibold">How long should the video be? </span>
                {data.posting_frequency_and_duration.duration}
              </p>
            </div>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Youtube Series Ideas  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.series_ideas.map((idea, key ) => (
                <li className="my-1" key={key}>
                  <span className="font-semibold">{idea.title}: </span>
                  {idea.description}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="w-full px-3 break-inside-avoid mb-4">
          <div className="border-b -mx-3 px-3 py-1.5">
            <h2 className="font-bold"> Tips to increase viewer engagement  </h2>
          </div>
          <div className="my-3 text-sm">
            <ul className="mt-2 list-disc ml-5">
              {data.increase_viewer_engagement.map((engagement, key ) => (
                <li className="my-1" key={key}>
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
                <li className="my-1" key={key}>
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

