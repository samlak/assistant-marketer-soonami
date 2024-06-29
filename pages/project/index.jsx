import { Layout } from "@/components/layout/new";
import Head from "next/head";
import { CreateProject } from "@/components/project/create";
import { createClient } from '@/supabase/utils/server-props'

export default function NewProject({ user }) {

  return (
    <>
      <Head>
        <title>Create Project | Assistant Marketer</title>
      </Head>
      
      <Layout 
        user={ user.user_metadata } 
        isNewUser={true}
      >
        <main className="container mx-auto px-4">
          <section className="mx-auto max-w-[430px] w-full mt-7 mb-7">
            <CreateProject />
          </section>
        </main>
      </Layout>
    </>
  );
}


export async function getServerSideProps(context) {
  const supabase = createClient(context)

  const { data, error } = await supabase.auth.getUser();

  if (error || !data) {
    return {
      redirect: {
        destination: '/login?redirect=project',
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