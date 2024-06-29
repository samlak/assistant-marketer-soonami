import { Layout } from "@/components/layout";
import Head from "next/head";
import { createClient as createServerClient  } from '@/supabase/utils/server-props';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brand, ProjectLoader, ProjectNotFound, Competitors  } from "@/components/project";
import { createClient } from "@/supabase/utils/component";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CreateContent } from "@/components/content";
import useStore from '@/store/useStore';
import { MarketingStrategy } from "@/components/marketing";
import { Trends } from "@/components/trends";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const supabase = createClient();
  const { 
    project,
    setProject,
    setMarketingStrategy,
    activeProject, 
    layoutLoading,
    setIndividualContent
  } = useStore();

  const [ activeTab, setActiveTab ] = useState("brand")
  const [ isNewContentActive, setIsNewContentActive ] = useState(false)

  const onTabChange = (data) => {
    setActiveTab(data)
  }

  const activateNewContent = () => {
    setIsNewContentActive(true);
  }

  const { data } = useQuery({ 
    queryKey: ["project", activeProject], 
    queryFn: async (option) => {
      if(option.queryKey[1]) {
        const { data: projectData } = await supabase.from('projects')
          .select('*')
          .eq("id", option.queryKey[1])
          .maybeSingle();

        if(!projectData) {
          setProject("NOT FOUND")
          return projectData;
        }

        const { data: marketingData } = await supabase.from('marketing')
          .select('*')
          .eq("project", option.queryKey[1])
          .maybeSingle();

        setProject(projectData);
        setMarketingStrategy(marketingData);

        return projectData;
      } else if(!layoutLoading) {
        setProject(null);
      }

      return null;
    }
  });



  return (
    <>
      <Head>
        <title>Dashboard | Assistant Marketer</title>
      </Head>
      <Layout 
        activeMenu="Dashboard"
      >
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          { project === "NOT FOUND" ?
            <ProjectNotFound />
          : project ?
            <>
              <Tabs
                defaultValue="brand"
                value={activeTab}
                onValueChange={onTabChange}
                className="w-full"
              >
                <div className="flex justify-between items-center sm:flex-row flex-col-reverse">
                  <h2 className="text-lg font-semibold sm:mt-0 mt-4">
                    { 
                      activeTab == "brand" ? "Brand Information" : 
                      activeTab == "competitors" ? "Competitors Analysis" : 
                      activeTab == "marketing" ? "Marketing Strategies" : 
                      "Trends"
                    }
                  </h2>
                  <TabsList>
                    <TabsTrigger value="brand">Brand</TabsTrigger>
                    <TabsTrigger value="competitors">Competitors</TabsTrigger>
                    <TabsTrigger value="marketing">Marketing</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="trends">
                  <Trends 
                    setActiveTab={setActiveTab}
                  />
                </TabsContent>
                <TabsContent value="brand">
                  <Brand 
                    project={project} 
                    setActiveTab={setActiveTab}
                    setProject={setProject}
                  />
                </TabsContent>
                <TabsContent value="competitors">
                  <section className="mt-3">
                    <Competitors 
                      project={project} 
                      setProject={setProject}
                      setActiveTab={setActiveTab}
                    />
                  </section>
                </TabsContent>

                <TabsContent value="marketing">
                  <section className="mt-3">
                    <MarketingStrategy 
                      model={project.model} 
                    />
                  </section>
                </TabsContent>
              </Tabs>

              <div className="bottom-3 right-3 fixed">
                <Button 
                  className="h-12 font-bold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105" 
                  onClick={activateNewContent}
                >
                  Create Content 
                </Button>
              </div>

              <CreateContent 
                isNewContentActive={isNewContentActive}
                setIsNewContentActive={setIsNewContentActive}
                project={project}
                updateContent={setIndividualContent}
              />
            </>
          : 
            <ProjectLoader />
          }
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
        destination: '/login?redirect=dashboard',
        permanent: false,
      },
    }
  }

  const { data: projectsData, error: projectsError } = await supabase.from('projects')
    .select('id, name')
    .gte("version", 1);

  if (projectsError || !projectsData.length) {
    return {
      redirect: {
        destination: '/project',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}