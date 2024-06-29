import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import OverlayLoader from "@/components/loader/overlay";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { mixpanelTrack } from "@/lib/mixpanel";
import useStore from '@/store/useStore';

const FormSchema = z.object({
  name: z.string().min(2, { message: "Product name is too short" }),
  url: z.string().url({ message: "You must provide a valid website URL" }),
  audience: z.string().min(3, { message: "Audience is required" }),
  model: z.string().min(3, { message: "Product stage is required" }),
});

export function CreateProject() {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);

  const { 
    setActiveProject, 
    setIndividualLayoutProject 
  } = useStore();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      url: "",
      audience: "",
      model: "",
    },
  });

  async function onSubmit(data, event) {
    event.preventDefault();
    setUploading(true);

    mixpanelTrack("Create Project", {
      model: data["model"]
    });

    await fetch("/api/project/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setUploading(false);
        if (!data.status) {
          toast({
            variant: "destructive",
            description:
              "Error occured while creating your project. Please try again.",
          });
          return;
        }

        toast({
          description:
            "Your project has been created successfully. You will be redirected to the dashboard.",
        });

        setIndividualLayoutProject(data.data)
        setActiveProject(data.data.id)
        localStorage.setItem('activeProject', data.data.id);

        router.push(`/dashboard`);
      });
    return;
  }

  const businessModel = [
    "Business to Consumer (B2C)",
    "Business to Business (B2B)",
    "Marketplace",
  ]
  

  return (
    <Card className="px-4 py-4 relative">
      <h1 className="text-center text-lg font-bold">Create New Project</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Your Website URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://www.assistantmarketer.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="audience"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Who are your primary customers?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Business Model</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your business model" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {businessModel.map((model, key) => (
                        <SelectItem value={model} key={key}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-center">
            <Button type="submit" className="mt-5 px-7 w-full h-8">
              Create Project
            </Button>
          </div>
        </form>
      </Form>

      {uploading && (
        <OverlayLoader>
          <p className="text-base text-gray-700 font-bold mb-1 mt-3">
            Extracting project information from your website.
          </p>
          <p className="text-sm text-gray-700 font-semibold">
            Relax and wait this might take up to a minute.
          </p>
        </OverlayLoader>
      )}
    </Card>
  );
}
