import { create } from 'zustand';

type SidebarOption = 'Contextual RAG Memory' | 'Mood Insights' | 'Vinaya Ollama AI';
// Example: global UI state for sidebar selection
interface AppState {
  selectedSidebar: SidebarOption;
  setSelectedSidebar: (sidebar: SidebarOption) => void;
  ollamaRunning: boolean;
  setOllamaRunning: (running: boolean) => void;
  ollamaModels: string[];
  setOllamaModels: (models: string[]) => void;
}

export const useAppStore = create<AppState>((set: (fn: (state: AppState) => AppState) => void) => ({
  selectedSidebar: 'Contextual RAG Memory',
  setSelectedSidebar: (sidebar: SidebarOption) => set((state) => ({ ...state, selectedSidebar: sidebar })),
  ollamaRunning: false,
  setOllamaRunning: (running: boolean) => set((state) => ({ ...state, ollamaRunning: running })),
  ollamaModels: [],
  setOllamaModels: (models: string[]) => set((state) => ({ ...state, ollamaModels: models })),
}));
