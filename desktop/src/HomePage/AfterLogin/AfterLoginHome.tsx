import { TextEditor } from "./TextEditor/TextEditor";
import { AfterLoginRightTopBar } from "./RightSide/AfterLoginRightTopBar";
import { SideBarAfterLogin } from "./RightSide/SideBarComponents/SideBarAfterLogin";
import { useAppStore } from "../../store"
import { ContextualRAG } from "./RightSide/SideBarComponents/ContextualRAG/ContextualRAG";
import { MoodInsights } from "./RightSide/SideBarComponents/MoodInsights/MoodInsights";
import { VInayaOllamaAI } from "./RightSide/SideBarComponents/VinayaOllamaAI/VInayaOllamaAI";
import { RetrievePastEntries } from "./RightSide/SideBarComponents/RetrievePastEntries";

export const AfterLoginHome = () => {
    const { selectedSidebar } = useAppStore();
    return (
        <div className="flex flex-col h-screen bg-[#fbf8f0]">
            {/* Top section with sidebar and selected component */}
            <div className="flex flex-col flex-1 min-h-0">
                <AfterLoginRightTopBar />
                <div className="flex flex-col md:flex-row flex-1 min-h-0">
                    <div className="w-full md:w-1/4 min-h-[150px] md:min-h-0">
                        <SideBarAfterLogin />
                    </div>
                    <div className="w-full md:w-3/4 min-h-[400px] md:min-h-0">
                        {selectedSidebar === 'Contextual RAG Memory' && <ContextualRAG />}
                        {selectedSidebar === 'Mood Insights' && <MoodInsights />}
                        {selectedSidebar === 'Vinaya Ollama AI' && <VInayaOllamaAI />}
                        {selectedSidebar === 'Retrieve Past Entries' && <RetrievePastEntries/>}
                    </div>
                </div>
            </div>

            
            <div className="w-full h-[0vh] md:h-[0vh]">
                <TextEditor />
            </div>
        </div>
    );
};