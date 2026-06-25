import { create } from "zustand";

interface NavState {
  activeSection: string;
  cmdKOpen: boolean;
  setActiveSection: (section: string) => void;
  setCmdKOpen: (open: boolean) => void;
}

export const useNavStore = create<NavState>((set) => ({
  activeSection: "home",
  cmdKOpen: false,
  setActiveSection: (section) => set({ activeSection: section }),
  setCmdKOpen: (open) => set({ cmdKOpen: open }),
}));
