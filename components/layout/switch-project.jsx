import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel
} from "@/components/ui/select"
import useStore from '@/store/useStore';
import Link from "next/link"
import { BadgePlus } from "lucide-react";

export function SwitchProject() {
  const { 
    layoutProjects, 
    activeProject,
    setActiveProject 
  } = useStore();

  const onChangeProject = (value) => {
    setActiveProject(value)
    localStorage.setItem('activeProject', value);
  }

  return (
    <Select defaultValue={activeProject} onValueChange={onChangeProject}>
      <SelectTrigger className="w-[150px] mr-2 border-primary h-9">
        <SelectValue placeholder="Select a project" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          { layoutProjects.map((project, key) => (
            <SelectItem value={ project.id } key={key}>
              { project.name }
            </SelectItem>
          ))}

          <SelectLabel className="font-normal hover:bg-accent border-t -mx-1 -mb-1 mt-1 ">
            <Link href="/project" className="py-1.5 pl-3 pr-2 -my-1.5 -ml-8 w-max flex items-center" >
              <BadgePlus className="h-4 w-4 mr-2" />
              Create New Project
            </Link>
          </SelectLabel>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}