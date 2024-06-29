import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { RefreshCcw, X } from "lucide-react";
import OverlayLoader from "@/components/loader/overlay";
import { toast } from "@/components/ui/use-toast";
import { mixpanelTrack } from "@/lib/mixpanel";
import useStore from '@/store/useStore';

const FormSchema = z.object({
  note: z.string(),
});

export function Regenerate({ 
  type,
  channel
}) {
  const [regenerating, setRegenerating] = useState(false);
  const [dialogStatus, setDialogStatus] = useState(false);

  const { 
    project,
    setProject,
    marketingStrategy,
    setMarketingStrategy,
  } = useStore();

  const toggleDialog = () => {
    setDialogStatus(!dialogStatus);
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      note: "",
    },
  });

  const customizedData = {
    brand: {
      title: "Regenerate Brand Information",
      tag: "Regenerate Brand",
      submitButton: "Regenerate Brand",
      loaderText: "Regenerating your brand with new information.",
      labelText: "What should the new brand information include? (optional)",
    },
    strategy: {
      title: "Regenerate Marketing Strategy",
      tag: "Regenerate Strategy",
      submitButton: "Regenerate Marketing Strategy",
      loaderText: "Regenerating your marketing strategy with new information.",
      labelText: "What do you want to add to marketing strategy? (optional)",
    },
    competitor: {
      title: "Regenerate Competitor Analysis",
      tag: "Regenerate Competitor",
      submitButton: "Regenerate Competitor Analysis",
      loaderText: "Regenerating your competitor analysis with new information.",
      labelText: "What do you want to add to competitor analysis? (optional)",
    },
  };

  const formData = {
    brand: {
      url: "/api/project/regenerate",
      options: {
        name: project.name,
        id: project.id,
        description: project.summary,
        audience: project.audience,
        model: project.model,
      },
    },
    strategy: {
      url: "/api/marketing/regenerate",
      options: {
        channel, 
        projectName: project.name, 
        audience: project.audience, 
        projectDescription: project.summary, 
        marketingId: marketingStrategy ? marketingStrategy.id : ""
      },
    },
    competitor: {
      url: "/api/project/competitor/regenerate",
      options: {
        name: project.name,
        id: project.id,
        audience: project.audience, 
        description: project.summary,
      },
    },
  };

  const onSubmit = async (data) => {
    setRegenerating(true);

    mixpanelTrack(customizedData[type].tag);

    await fetch(formData[type].url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData[type].options,
        note: data["note"],
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setRegenerating(false);
        if (!data.status) {
          toast({
            variant: "destructive",
            description:
              "Error occured while generating your marketing strategy. Please try again.",
          });
          return;
        }

        if(type === "strategy") {
          setMarketingStrategy(data.data);
        } else {
          setProject(data.data);
        }
        toast({
          description:
            "Your marketing strategy has been generated successfully.",
        });
        toggleDialog();
      });
  };

  return (
    <AlertDialog open={dialogStatus} onOpenChange={toggleDialog}>
      <AlertDialogTrigger asChild>
        { type === "strategy" ?
          <Button
            className="h-8 px-3 mr-2"
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        :
          <Button
            variant={"outline"}
            className="h-7 px-3 border-primary hover:bg-primary hover:text-primary-foreground"
          >
            <RefreshCcw className="h-3 w-3 mr-1" />
            <span> Regenerate </span>
          </Button>
        }
      </AlertDialogTrigger>
      <AlertDialogContent>
        <h3 className="font-semibold text-lg">
          {" "}
          {customizedData[type].title}{" "}
        </h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel> {customizedData[type].labelText} </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What do you want to include in the new result."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4 w-full">
              <RefreshCcw className="h-4 w-4 mr-1" />
              <span> {customizedData[type].submitButton} </span>
            </Button>
          </form>
        </Form>

        {regenerating && (
          <OverlayLoader>
            <p className="text-base text-gray-700 font-bold mb-1 mt-3">
              {customizedData[type].loaderText}
            </p>
            <p className="text-sm text-gray-700 font-semibold">
              Relax and wait this might take up to a minute.
            </p>
          </OverlayLoader>
        )}

        <AlertDialogCancel className="absolute border-0 mt-0 h-5 p-0 right-4 top-4 hover:bg-transparent text-muted-foreground">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
