import { create } from "zustand";

interface NavState {
  activeSection: string;
  cmdKOpen: boolean;
  setActiveSection: (section: string) => void;
  setCmdKOpen: (open: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
  activeSection: "",
  cmdKOpen: false,
  setActiveSection: (section) =>
    set((state) => ({
      activeSection: state.activeSection === section ? "" : section,
    })),
  setCmdKOpen: (open) => set({ cmdKOpen: open }),
}));
