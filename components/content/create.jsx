import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X, CircleArrowLeft, Clipboard } from "lucide-react";
import OverlayLoader from "@/components/loader/overlay";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { mixpanelTrack } from "@/lib/mixpanel";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';

const FormSchema = z.object({
  channel: z
    .string()
    .min(1, { message: "Specify the type of content to generate." }),
  note: z.string(),
});

export function CreateContent({
  isNewContentActive,
  setIsNewContentActive,
  channel,
  project,
  updateContent
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [newContent, setNewContent] = useState({
    channel: "",
    content: "",
  });
  const [copied, setCopied] = useState(false);

  const toggleDialog = () => {
    goBack();
    setIsNewContentActive(!isNewContentActive);
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      channel: "",
      note: "",
    },
  });

  const channels = [
    "LinkedIn",
    "Instagram",
    "Facebook",
    "Twitter",
    "TikTok",
    "YouTube",
    "Content Marketing",
    "Email Marketing",
    "Online Communities and Forums",
    "Influencer Marketing",
  ];

  const onSubmit = async (formData) => {
    setIsGenerating(true);

    mixpanelTrack("Create Content", {
      channel: formData["channel"]
    });

    await fetch("/api/content/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        projectId: project.id,
        projectName: project.name,
        channel: formData["channel"],
        summary: project.summary,
        note: formData["note"],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsGenerating(false);
        if (!data.status) {
          toast({
            variant: "destructive",
            description:
              "Error occured while generating your content. Please try again.",
          });
          return;
        }

        toast({
          description: "Your content has been generated successfully.",
        });

        setNewContent({
          channel: formData["channel"],
          content: data.data.text,
        });

        updateContent({
          channel: formData["channel"],
          text: data.data.text,
        })
      });
  };

  const goBack = () => {
    setNewContent({
      channel: "",
      content: "",
    });
    setCopied(false);
  };

  const copyToClipboard = () => {
    setCopied(true);
  };

  useEffect(() => {
    if (channel) {
      form.setValue("channel", channel);
    }
  }, [channel]);

  return (
    <AlertDialog open={isNewContentActive} onOpenChange={toggleDialog}>
      <AlertDialogContent className="max-w-[800px] sm:w-[90%]">
        {!newContent.channel ? (
          <>
            <h3 className="font-semibold text-lg"> Create New Content </h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                  control={form.control}
                  name="channel"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormLabel>
                        What type of content do you want generate?
                      </FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a platform" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {channels.map((channel, key) => (
                              <SelectItem value={channel} key={key}>
                                {channel}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel> What should the content be about? (optional) </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          placeholder="Tell us what you will like to generate or let the platform generate it for you."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="mt-4 w-full">
                  Generate
                </Button>
              </form>
            </Form>

            {isGenerating && (
              <OverlayLoader>
                <p className="text-base text-gray-700 font-bold mb-1 mt-3">
                  Generating new content
                </p>
                <p className="text-sm text-gray-700 font-semibold">
                  Relax and wait this might take up to a minute.
                </p>
              </OverlayLoader>
            )}
          </>
        ) : (
          <div>
            <ScrollArea className="h-[400px] text-sm">
              <h3 className="mb-1 text-lg font-semibold">
                {newContent.channel}
              </h3>
              <ReactMarkdown 
                className="markdown markdown_style leading-tight"
                remarkPlugins={[remarkGfm]}
              >
                { newContent.content }
              </ReactMarkdown>
            </ScrollArea>

            <div className="flex mt-2 justify-center -mb-3">
              <Button className="h-7 px-3 mr-2" onClick={goBack}>
                <CircleArrowLeft className="h-4 w-4 mr-1" />
                <span> Back </span>
              </Button>
              <CopyToClipboard text={newContent.content} onCopy={copyToClipboard}>
                <Button className="h-7 px-3">
                  <Clipboard className="h-4 w-4 mr-1" />
                  <span> { copied ? "Copied!" : "Copy" } </span>
                </Button>
              </CopyToClipboard>
            </div>
          </div>
        )}

        <AlertDialogCancel className="absolute border-0 mt-0 h-5 p-0 right-4 top-4 hover:bg-transparent text-muted-foreground">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
