import { Layout } from "@/components/layout";
import Head from "next/head";
import { createClient as createServerClient } from '@/supabase/utils/server-props'

export default function Account({ user }) {

  return (
    <>
      <Head>
        <title>Account | Assistant Marketer</title>
      </Head>
      
      <Layout 
        user={ user.user_metadata } 
        activeMenu="Account"
      >
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <section className="">
            <div className="flex items-center mb-3">
              <h1 className="text-lg font-semibold md:text-2xl">Account</h1>
            </div>
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