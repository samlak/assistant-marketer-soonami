import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { 
  X,
  Eye,
  Clipboard
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

export function ViewContent({ content }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    setCopied(true);
  }; 

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"outline"}
          className="h-7 px-3 border-primary hover:bg-primary hover:text-primary-foreground"
        >
          <Eye className="h-4 w-4 mr-1" />
          <span> View </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[700px] sm:w-[90%]">
        <ScrollArea className="h-[400px] text-sm">
          <h3 className="mb-1 text-lg font-semibold">{content.channel} Post</h3>
          <ReactMarkdown 
            className="markdown markdown_style leading-tight"
            remarkPlugins={[remarkGfm]}
          >
            { content.text }
          </ReactMarkdown>
        </ScrollArea>

        <div className="flex justify-center -mt-2 -mb-4">
          <CopyToClipboard text={content.text} onCopy={copyToClipboard}>
            <Button className="h-7 px-3">
              <Clipboard className="h-4 w-4 mr-1" />
              <span> { copied ? "Copied!" : "Copy to Clipboard" } </span>
            </Button>
          </CopyToClipboard>
        </div>

        <AlertDialogCancel 
          className="absolute border-0 mt-0 h-5 p-0 right-4 top-4 hover:bg-transparent text-muted-foreground"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>

      </AlertDialogContent>
    </AlertDialog>
  );
}
