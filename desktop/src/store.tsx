import { create } from 'zustand';

type SidebarOption = 'Contextual RAG Memory' | 'Mood Insights' | 'Vinaya Ollama AI' | 'Retrieve Past Entries';
// Example: global UI state for sidebar selection
interface AppState {
  selectedSidebar: SidebarOption;
  setSelectedSidebar: (sidebar: SidebarOption) => void;
  ollamaRunning: boolean;
  setOllamaRunning: (running: boolean) => void;
  ollamaModels: string[];
  setOllamaModels: (models: string[]) => void;
  currentModel: string;
  setCurrentModel: (model: string) => void;
  activeMoodTab: string;
  setActiveMoodTab: (tab: string) => void;
  selectedDays: number;
  setSelectedDays: (days: number) => void;
  chartData: any;
  setChartData: (data: any) => void;
  chartDataType: string;
  setChartDataType: (type: string) => void;
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
}

export const useAppStore = create<AppState>((set: (fn: (state: AppState) => AppState) => void) => ({
  selectedSidebar: localStorage.getItem("vinaya_selectedSidebar") as SidebarOption || 'Contextual RAG Memory',
  setSelectedSidebar: (sidebar: SidebarOption) => {
    localStorage.setItem("vinaya_selectedSidebar", sidebar)
    set((state) => ({     
     ...state, selectedSidebar: sidebar }))},
  ollamaRunning: false,
  setOllamaRunning: (running: boolean) => set((state) => ({ ...state, ollamaRunning: running })),
  ollamaModels: [],
  setOllamaModels: (models: string[]) => set((state) => ({ ...state, ollamaModels: models })),
  currentModel: "",
  setCurrentModel: (model: string) => set((state) => ({ ...state, currentModel: model })),
  activeMoodTab: "Overview",
  setActiveMoodTab: (tab: string) => set((state) => ({ ...state, activeMoodTab: tab })),
  selectedDays: 2,
  setSelectedDays: (days: number) => set((state) => ({ ...state, selectedDays: days })),
  chartData: [],
  setChartData: (data: any) => set((state) => ({ ...state, chartData: data })),
  chartDataType: "Initial",
  setChartDataType: (type: string) => set((state) => ({ ...state, chartDataType: type })),
  selectedMood: "anger",
  setSelectedMood: (mood: string) => set((state) => ({ ...state, selectedMood: mood })),
}));
