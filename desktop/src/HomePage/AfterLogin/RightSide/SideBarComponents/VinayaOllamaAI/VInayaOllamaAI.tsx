import { useState } from "react";
import { useAppStore } from "../../../../../store";
import { Send } from "lucide-react";
import VinayaOllamaAIBackground from "../../../../../assets/BackgroundImages/VinayaOllamaAIBackground.png"
import { InChatAIModelDropdown } from "./InChatAIModelDropdown";

interface Message {
    content: string;
    isUser: boolean;
}

export const VInayaOllamaAI = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { currentModel } = useAppStore();

    const handleAskStream = async () => {
        if (!prompt.trim()) return;

        // Add user message
        setMessages(prev => [...prev, { content: prompt, isUser: true }]);
        setIsLoading(true);
        setPrompt("");

        let assistantMessage = "";
        try {
            const response: any = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "text/event-stream",
                },
                body: JSON.stringify({
                    prompt: prompt,
                    model_name: currentModel,
                })
            });

            const reader = response?.body?.getReader();
            const decoder = new TextDecoder("utf-8");
            
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value, { stream: true });
                assistantMessage += chunk;
                setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && !lastMessage.isUser) {
                        lastMessage.content = assistantMessage;
                        return newMessages;
                    } else {
                        return [...newMessages, { content: assistantMessage, isUser: false }];
                    }
                });
            }
        } catch (error) {
            console.error("Error:", error);
            setMessages(prev => [...prev, { content: "Sorry, something went wrong. Please try again.", isUser: false }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleAskStream();
        }
    };

    return (
        <div
            className="flex flex-col h-full relative text-[#2F4F4F]"
            style={{
                backgroundImage: `url(${VinayaOllamaAIBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            
            <div className="absolute inset-0 bg-[#ddcb99]/50 pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col h-full">
                <div className="items-start pt-6 pb-2">
                    <InChatAIModelDropdown />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-full max-w-2xl flex flex-col flex-1">
                        <div className="flex-1 overflow-y-auto px-2 md:px-0 py-4 space-y-4">
                            {messages.length === 0 && !isLoading ? (
                                <div className="flex flex-col items-center justify-center h-[40vh] select-none" style={{fontFamily: 'Playfair Display'}}>
                                    <h2 className="text-lg md:text-3xl font-semibold mb-2 text-[#2F4F4F] text-center">Ready when you are.</h2>
                                    <p className="text-base md:text-lg text-[#6b7280] text-center">Ask anything.</p>
                                </div>
                            ) : (
                                messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] rounded-xl px-4 py-3 shadow-md ${
                                                message.isUser
                                                    ? 'bg-white text-[#2F4F4F]'
                                                    : 'bg-[#e0f2ef] text-[#2F4F4F]'
                                            }`}
                                        >
                                            <p className="text-base whitespace-pre-wrap">{message.content}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-[#e0f2ef] text-[#2F4F4F] rounded-xl px-4 py-3 shadow-md">
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-[#2F4F4F] rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-[#2F4F4F] rounded-full animate-bounce delay-100" />
                                            <div className="w-2 h-2 bg-[#2F4F4F] rounded-full animate-bounce delay-200" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-full px-2 md:px-0 pb-6">
                            <div className="flex items-end gap-2 bg-white rounded-xl p-2">
                                <textarea
                                    value={prompt}
                                    onChange={(e) => setPrompt(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 resize-none rounded-lg bg-white text-[#2F4F4F] p-2 text-base focus:outline-none min-h-[40px] max-h-[120px] placeholder-[#6b7280]"
                                    rows={1}
                                />
                                <button
                                    onClick={handleAskStream}
                                    disabled={isLoading || !prompt.trim()}
                                    className={`p-2 rounded-lg ${
                                        isLoading || !prompt.trim()
                                            ? 'bg-[#e0f2ef] text-[#bfa76a] cursor-not-allowed opacity-60'
                                            : 'bg-[#2F4F4F] text-white hover:bg-[#1F3F3F]'
                                    } transition-colors`}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};