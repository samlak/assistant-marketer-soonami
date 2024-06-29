import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import OverlayLoader from "@/components/loader/overlay";
import { toast } from "@/components/ui/use-toast";
import { createClient } from "@/supabase/utils/component";

const FormSchema = z.object({
  improvement: z
    .string()
    .min(20, { message: "You need to describe your suggestion a little more." }),
  suggestion: z
    .string()
    .min(20, { message: "You need to describe your suggestion a little more." }),
});

export function FeedbackForm() {
  const supabase = createClient()
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      improvement: "",
      suggestion: "",
    },
  });

  const onSubmit = async (formData) => {
    setIsSaving(true);

    const { data, error } = await supabase
    .from('feedbacks')
    .insert([{ 
      improvement: formData["improvement"],
      suggestion: formData["suggestion"]
    }])
    .select()

    setIsSaving(false);

    if (error) {
      toast({
        variant: "destructive",
        description:
          "Unfortunately we are unable to save your feedback. Please try again.",
      });
      return;
    }

    toast({
      description: "Thank you very much for your feedback. You can now continue using the platform.",
    });
  };


  return (
    <Card className="px-4 py-4 relative">
      <h1 className="text-center text-xl font-bold mb-2">Submit Feedback</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <FormField
            control={form.control}
            name="improvement"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel> What feature do you care about the most that needs to be improved on?  </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="What feature do you think we should improve on the platform to make it easier to promote your brand."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="suggestion"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel> What feature do you suggest we add to the platform?  </FormLabel>
                <FormControl>
                  <Textarea
                    rows={5}
                    placeholder="Suggest a feature that could make your marketing faster, cheaper and profitable"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-4 w-full">
            Submit Feedback
          </Button>
        </form>
      </Form>

      <p className="text-center mt-2">
        You can also contact us at {" "} 
        <a 
          href="mailto:support@assistantmarketer.com" 
          className="text-primary hover:underline"
          target="_blank"
        >
          support@assistantmarketer.com
        </a>
      </p>

      {isSaving && (
        <OverlayLoader>
          <p className="text-base text-gray-700 font-bold mb-1 mt-3">
            Submitting your Feedback
          </p>
          <p className="text-sm text-gray-700 font-semibold">
            We appreciate your feedback. Your feedback is valuable to us.
          </p>
        </OverlayLoader>
      )}
    </Card>
  );
}
