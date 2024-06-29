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
import Link from "next/link";
import Head from "next/head";
import { createClient } from "@/supabase/utils/component";
import { InboxIcon } from "lucide-react";
import { mixpanelTrack } from "@/lib/mixpanel";

const FormSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Your password must be atleast 8 character long" }),
});

export default function Register() {
  const supabase = createClient();
  const [authenticating, setAuthenticating] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data, event) => {
    event.preventDefault();
    setAuthenticating(true);

    const formData = {
      email: data["email"],
      password: data["password"],
      options: {
        emailRedirectTo: window.location.origin,
        data: {
          firstName: data["firstName"],
          lastName: data["lastName"],
          name: `${data["firstName"]} ${data["lastName"]}`,
        },
      },
    };

    const { error } = await supabase.auth.signUp(formData);
    setAuthenticating(false);

    if (error) {
      toast({
        title: "User registration is unsuccessful",
        description: <strong> {error.message} </strong>,
      });
      return;
    }

    mixpanelTrack("Sign Up");
    setIsRegistered(true);
  };

  const signInWithGoogle = async () => {
    mixpanelTrack("Sign Up");

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
      },
    });
  };

  return (
    <>
      <Head>
        <title>Register | Studypack</title>
      </Head>
      <main className="flex items-center justify-center max-h-full h-screen bg-blue-50 overflow-y-scroll pt-8 pb-8">
        <div className="w-[95%] h-full max-w-[470px] mx-auto">
          {!isRegistered ? (
            <Card className="w-full shadow-md">
              <CardHeader>
                <CardTitle className="text-center">
                  Create a free account
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <div className="flex w-full md:space-x-3 md:flex-row flex-col">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem className="md:w-1/2 w-full mt-1">
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Johnson" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem className="md:w-1/2 w-full mt-1">
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Ibrahim" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mt-1">
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="mail@gmail.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="mt-1">
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="password"
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
                        "Register"
                      )}
                    </Button>
                  </form>
                </Form>

                <div className="flex flex-col justify-center space-y-4 mt-5">
                  <Button
                    className="h-[44px] w-full border-blue-500"
                    variant="outline"
                    onClick={signInWithGoogle}
                  >
                    Sign Up with Google
                  </Button>

                  <div className="text-center text-sm font-medium">
                    {"Already have an account? "}
                    <Link
                      className="underline text-blue-600 hover:text-blue-700"
                      href="/login"
                    >
                      Log in
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="w-full shadow-md h-[500px] flex items-center">
              <div>
                <CardHeader className="flex items-center text-center gap-4 pb-4">
                  <InboxIcon className="h-10 w-10 text-primary" />
                  <CardTitle>Email Confirmation Sent</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    We've sent a confirmation email to your inbox. Please check
                    your inbox to confirm your email address.
                  </p>
                </CardContent>
              </div>
            </Card>
          )}
        </div>
      </main>
    </>
  );
}
