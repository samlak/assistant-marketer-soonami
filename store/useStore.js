import { create } from 'zustand';

const useStore = create((set) => ({
  layoutLoading: true,
  userData: null,
  layoutProjects: [],
  activeProject: "",
  project: null,
  marketingStrategy: null,
  contents: [],
  allContents: null,
  setAllContents: (content) => set({ allContents: content }),
  setContent: (content) => set({ content }),
  setIndividualAllContents: (content) => set((state) => ({ 
    allContents: [
      content,
      ...state.allContents
    ] 
  })),
  setIndividualContent: (content) => set((state) => ({ 
    contents: [
      content,
      ...state.contents, 
    ] 
  })),
  setMarketingStrategy: (strategy) => set({ marketingStrategy: strategy }),
  setProject: (project) => set({ project }),
  setLayoutLoading:  (loading) => set({ layoutLoading: loading }),
  setUserData:  (user) => set({ userData: user }),
  setActiveProject:  (project) => set({ activeProject: project }),
  setLayoutProjects:  (projects) => set({ layoutProjects: projects }),
  setIndividualLayoutProject: (project) => set((state) => ({ 
    layoutProjects: [
      ...state.layoutProjects, 
      project
    ] 
  }))
}));

export default useStore;