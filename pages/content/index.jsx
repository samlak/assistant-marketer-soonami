import { Layout } from "@/components/layout";
import Head from "next/head";
import { createClient as createServerClient } from '@/supabase/utils/server-props'
import { createClient } from "@/supabase/utils/component";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useStore from '@/store/useStore';
import { Button } from "@/components/ui/button"
import { Card }  from "@/components/ui/card"
import { ViewContent, EmptyContent, CreateContent } from "@/components/content";
import { CirclePlus } from "lucide-react";
import { ProjectLoader  } from "@/components/project";

export default function Contents() {
  const [ isNewContentActive, setIsNewContentActive ] = useState(false);
  const supabase = createClient();
  const { 
    project,
    setProject,
    allContents,
    setAllContents,
    activeProject,
    setIndividualAllContents
  } = useStore();


  const { data } = useQuery({ 
    queryKey: ["contents", activeProject], 
    queryFn: async (option) => {
      if(option.queryKey[1]) {
        const { data: contentData } = await supabase.from('contents')
          .select('*')
          .order('created_at', { ascending: false });

        setAllContents(contentData)

        const { data: projectData } = await supabase.from('projects')
          .select('*')
          .eq("id", option.queryKey[1])
          .maybeSingle();

        setProject(projectData);

        return contentData;
      } else if(!layoutLoading) {
        setAllContents(null);
      }

      return null;
    }
  });

  const activateNewContent = () => {
    setIsNewContentActive(true);
  }

  return (
    <>
      <Head>
        <title>Contents | Assistant Marketer</title>
      </Head>
      
      <Layout activeMenu="Contents" >
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <section className="mt-3">
            { !allContents ?
              <ProjectLoader />
            : allContents.length ?
              <Card className="w-full px-3 mb-4">
                <div className="border-b -mx-3 px-3 py-2">
                  <div className="flex justify-between">
                    <h2 className="font-semibold text-lg">Contents</h2>
                    <Button
                      onClick={activateNewContent}
                      variant={"outline"}
                      className="h-7 px-3 border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <CirclePlus className="h-4 w-4 mr-1" />
                      <span> New Content </span>
                    </Button>
                  </div>
                </div>
                <div className={"py-3"}>
                  { allContents.map((content, key) => ( 
                    <Card
                      key={key}
                      className="w-full px-3 mb-4"
                    >
                      <div className="border-b -mx-3 px-3 py-1">
                        <div className="flex justify-between items-center">
                          <h2 className="font-semibold">{content.channel} Post</h2>
                          <ViewContent content={content} />
                        </div>
                      </div>
                      <p className="text-sm py-3">
                        {content.text.substring(0, 350)+"..."}
                      </p>
                    </Card>
                  ))}
                </div>
              </Card>
            : 
              <EmptyContent activateNewContent={activateNewContent} />
            }
          </section>
        </main>

        <CreateContent 
          isNewContentActive={isNewContentActive}
          setIsNewContentActive={setIsNewContentActive}
          project={project}
          updateContent={setIndividualAllContents}
        />
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
        destination: '/login?redirect=content',
        permanent: false,
      },
    }
  }

  return {
    props: { },
  }
}