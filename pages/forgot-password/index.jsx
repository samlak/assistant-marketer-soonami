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
  FormLabel
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { SpinIcon } from "@/components/icon";
import Link from "next/link";
import Head from "next/head";
import { createClient } from "@/supabase/utils/component";
import { LockIcon } from "lucide-react"

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgetPassword() {
  const supabase = createClient()
  const [authenticating, setAuthenticating] = useState(false);
  const [ isPasswordReset, setIsPasswordReset ] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });


  const onSubmit = async (data, event) => { 
    event.preventDefault();
    setAuthenticating(true);

    const { error } = await supabase.auth.resetPasswordForEmail(data["email"])

    setAuthenticating(false); 
    if(error) {
      toast({
        title: "Password reset is unsuccessful",
        description: (
          <strong> { error.message } </strong>
        ),
      });
    }

    setIsPasswordReset(true)
  }

  return (
    <>
      <Head>
        <title>
          Reset Password | Studypack 
        </title>
      </Head>
      <main className="flex items-center justify-center h-screen bg-blue-50">
        { !isPasswordReset ?
          <Card className="w-[95%] max-w-[450px] shadow-md">
            <CardHeader>
              <CardTitle className="text-center">Reset Password</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mt-2">
                        <FormLabel>Email address</FormLabel>
                        <FormControl>
                          <Input placeholder="mail@gmail.com" {...field} />
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
                    : "Reset Password"  }
                  </Button>
                </form>
              </Form>

              <div className="flex flex-col justify-center mt-5">
                <div className="text-center text-sm font-medium">
                  {"Remember your password? "}
                  <Link className="underline text-blue-600 hover:text-blue-700" href="/login">
                    Log In
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        :
          <Card className="w-[80%] max-w-[450px] shadow-md h-[300px] flex items-center">
            <div>
              <CardHeader className="flex items-center text-center gap-4 pb-4">
                <LockIcon className="h-10 w-10 text-primary" />
                <CardTitle>Password Reset Confirmation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  We've sent a password reset email to your inbox. Please check your inbox to reset your password.
                </p>
              </CardContent>
            </div>
          </Card>
        }
      </main>
    </>
  );
}
