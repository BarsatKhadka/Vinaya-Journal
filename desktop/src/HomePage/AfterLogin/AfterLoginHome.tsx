import { TextEditor } from "./TextEditor/TextEditor";
import { AfterLoginRightTopBar } from "./RightSide/AfterLoginRightTopBar";
import { SideBarAfterLogin } from "./RightSide/SideBarComponents/SideBarAfterLogin";
import { useAppStore } from "../../store"
import { ContextualRAG } from "./RightSide/SideBarComponents/ContextualRAG";
import { MoodInsights } from "./RightSide/SideBarComponents/MoodInsights";
import { VInayaOllamaAI } from "./RightSide/SideBarComponents/VInayaOllamaAI";

export const AfterLoginHome = () => {
    const { selectedSidebar } = useAppStore();
    return (
        <div className="grid grid-cols-2 h-screen divide-x divide-gray-200/90">
            <div className="flex flex-col h-full">
                <AfterLoginRightTopBar />
                <div className="flex flex-1 border-t border-gray-200/90">
                    <div className="w-1/4 border-r border-gray-200/90">
                        <SideBarAfterLogin />
                    </div>
                    <div className="w-3/4">
                        {selectedSidebar === 'Contextual RAG Memory' && <ContextualRAG />}
                        {selectedSidebar === 'Mood Insights' && <MoodInsights />}
                        {selectedSidebar === 'Vinaya Ollama AI' && <VInayaOllamaAI />}
                    </div>
                </div>
            </div>
            <TextEditor />
        </div>
    );
};