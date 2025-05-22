import { LineChart, Bot, SquareTerminal } from "lucide-react";

export const SideBarAfterLogin = () => {
    return (
        <div className="flex flex-col h-full w-full bg-[#57847a] px-4 py-6 shadow-md">
            <div className="flex flex-col gap-2 mt-2">
                <button className="flex items-center gap-3 px-3 py-2 rounded-md text-white font-serif
                 text-base hover:bg-[#6fa397] transition-all w-full cursor-pointer">
                    <SquareTerminal className="w-5 h-5" />
                    <span>Contextual RAG</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-md text-white font-serif text-base hover:bg-[#6fa397] transition-all w-full cursor-pointer">
                    <LineChart className="w-5 h-5" />
                    <span>Mood Insights</span>
                </button>
                <button className="flex items-center gap-3 px-3 py-2 rounded-md text-white font-serif text-base hover:bg-[#6fa397] transition-all w-full cursor-pointer">
                    <Bot className="w-5 h-5" />
                    <span>Vinaya Ollama AI</span>
                </button>
            </div>
        </div>
    );
};
