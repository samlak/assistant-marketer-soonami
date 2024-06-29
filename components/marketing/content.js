import { Card }  from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export const ChannelContent = ({ data }) => {
  
  return (
    <>
      <Card className="w-full px-6 py-4 mt-3 relative">
        <ReactMarkdown 
          className="markdown markdown_style"
          remarkPlugins={[remarkGfm]}
        >
          { data.strategy }
        </ReactMarkdown>
      </Card>
    </>
  );
};

