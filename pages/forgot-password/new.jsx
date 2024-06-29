import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { SpinIcon } from "@/components/icon";
import Head from "next/head";
import { createClient } from "@/supabase/utils/component";
import { useRouter } from "next/router";

const FormSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Your password must be atleast 8 character long" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function NewPassword() {
  const supabase = createClient();
  const router = useRouter();
  const [authenticating, setAuthenticating] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setAuthenticating(true);

    const { error } = await supabase.auth.updateUser({
      password: data["password"],
    });

    setAuthenticating(false);
    if (error) {
      toast({
        title: "Password reset is unsuccessful",
        description: <strong> {error.message} </strong>,
      });

      return;
    }

    router.push("/dashboard");
  };

  return (
    <>
      <Head>
        <title>Create New Password | Studypack</title>
      </Head>
      <main className="flex items-center justify-center h-screen bg-blue-50">
        <Card className="w-[95%] max-w-[450px] shadow-md">
          <CardHeader>
            <CardTitle className="text-center">Create New Password</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="mt-2">
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Confirm password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="mt-4 w-full"
                  disabled={authenticating}
                >
                  {authenticating ? (
                    <>
                      <SpinIcon />
                      {" Processing"}
                    </>
                  ) : (
                    "Save New Password"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
