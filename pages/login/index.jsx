import { useState } from "react";
import { useRouter } from 'next/router';
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
  FormLabel
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { SpinIcon } from "@/components/icon";
import Link from "next/link";
import Head from "next/head";
import { createClient } from "@/supabase/utils/component";
import { mixpanelTrack } from "@/lib/mixpanel";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Your password must be atleast 8 character long" }),
});

export default function Login() {
  const router = useRouter()
  const supabase = createClient()
  const [authenticating, setAuthenticating] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data, event) => { 
    event.preventDefault();
    setAuthenticating(true);

    mixpanelTrack("Log In");

    const formData = {
      email: data["email"],
      password: data["password"],
    };

    const { error } = await supabase.auth.signInWithPassword({ ...formData })
    setAuthenticating(false); 

    if(error) {
      toast({
        title: "User authentication is unsuccessful",
        description: (
          <strong> { error.message } </strong>
        ),
      });
      return;
    }

    router.push('/dashboard')
  }

  const signInWithGoogle = async () => {
    mixpanelTrack("Log In");

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
        <title>
          Login | Studypack 
        </title>
      </Head>
      <main className="flex items-center justify-center h-screen bg-blue-50">
        <Card className="w-[95%] max-w-[450px] shadow-md">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mt-2">
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
                    <FormItem  className="mt-2">
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
                  { authenticating ? 
                    <>
                      <SpinIcon />
                      {" Processing"}
                    </>
                  : "Sign In"  }
                </Button>
              </form>
            </Form>

            <div className="flex flex-col justify-center mt-5">
              <Button
                className="h-[44px] w-full border-blue-500"
                variant="outline"
                onClick={signInWithGoogle}
              >
                Sign In with Google
              </Button>

              <div className="text-center text-sm font-medium mt-5 mb-2">
                {"Don\'t have an account? "}
                <Link className="underline text-blue-600 hover:text-blue-700" href="/register">
                  Sign Up
                </Link>
              </div>

              <div className="text-center text-sm font-medium">
                <Link className="underline text-blue-600 hover:text-blue-700" href="/forgot-password">
                  Forgot your password?
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
