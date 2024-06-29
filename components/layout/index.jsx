import {
  Home,
  LibraryBig,
  CalendarDays,
  MessageSquarePlus
} from "lucide-react"
import { createClient } from "@/supabase/utils/component";
import { useRouter } from 'next/router';
import { toast } from "@/components/ui/use-toast";
import { useEffect } from "react"
import useStore from '@/store/useStore';
import { Sidebar } from "./sidebar"
import { Navbar } from "./navbar"

export function Layout({ activeMenu = "Dashboard", children }) {
  const supabase = createClient()
  const router = useRouter()

  const { 
    userData, 
    setUserData, 
    setLayoutLoading, 
    setLayoutProjects,
    setActiveProject,
  } = useStore();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if(error) {
      toast({
        title: "Sign out is unsuccessful",
        description: (
          <strong> { error.message } </strong>
        ),
      });
      return ;
    }

    localStorage.removeItem('activeProject');
    router.push('/login')
  }

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      link: "/dashboard",
    },
    // {
    //   name: "Calendar",
    //   icon: <CalendarDays className="h-5 w-5" />,
    //   link: "/calendar",
    // },
    {
      name: "Contents",
      icon: <LibraryBig className="h-5 w-5" />,
      link: "/content",
    },
    // {
    //   name: "Account",
    //   icon: <User className="h-5 w-5" />,
    //   link: "/account",
    // },
    {
      name: "Feedback",
      icon: <MessageSquarePlus className="h-5 w-5" />,
      link: "/feedback",
    },
  ]

  const initializeState = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if(userError) {
      setLayoutLoading(false);
      return ;
    }

    const { data: projectsData, error: projectsError } = await supabase.from('projects')
    .select('id, name')
    .gte("version", 1);

    if(projectsError) {
      setLayoutLoading(false);
      return ;
    }

    setUserData(userData.user.user_metadata);
    setLayoutProjects([...projectsData]);

    let activeProject = projectsData.length > 0 ? projectsData[0]["id"] : "";
    const savedActiveProject = localStorage.getItem('activeProject');

    if(savedActiveProject) {
      activeProject = savedActiveProject;
    } else {
      localStorage.setItem('activeProject', activeProject);
    }

    setActiveProject(activeProject);
    setLayoutLoading(false);
  }

  useEffect(() => {
    if(!userData) {
      initializeState();
    }
  }, [])
  

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]">
      <Sidebar 
        menuItems={menuItems}
        activeMenu={activeMenu}
      />

      <div className="flex flex-col pt-14">
        <Navbar 
          menuItems={menuItems}
          signOut={signOut}
          activeMenu={activeMenu}
        />

        { children }
        
      </div>
    </div>
  )
}
