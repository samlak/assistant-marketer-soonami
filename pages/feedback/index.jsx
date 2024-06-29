import { Layout } from "@/components/layout";
import Head from "next/head";
import { createClient as createServerClient } from '@/supabase/utils/server-props'
import { FeedbackForm } from "@/components/feedback";

export default function Feedback({ user }) {

  return (
    <>
      <Head>
        <title>Feedback | Assistant Marketer</title>
      </Head>
      
      <Layout 
        user={ user.user_metadata } 
        activeMenu="Feedback"
      >
        <main className="container mx-auto px-4">
          <section className="mx-auto max-w-[450px] w-full mt-7 mb-7">
            <FeedbackForm />
          </section>
        </main>
      </Layout>
    </>
  );
}


export async function getServerSideProps(context) {
  const supabase = createServerClient(context)

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return {
      redirect: {
        destination: '/login?redirect=account',
        permanent: false,
      },
    }
  }

  return {
    props: {
      user: data.user,
    },
  }
}