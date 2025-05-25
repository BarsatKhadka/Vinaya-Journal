import { useState } from "react";
import { useAppStore } from "../../../../store";
import { Send } from "lucide-react";

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
        <div className="flex flex-col h-full bg-white">
            
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-xl font-serif text-[#2F4F4F]">Vinaya AI Chat</h1>
                <p className="text-sm text-gray-500">Powered by {currentModel || 'Ollama'}</p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                                message.isUser
                                    ? 'bg-[#2F4F4F] text-white'
                                    : 'bg-[#e0f2ef] text-[#2F4F4F]'
                            }`}
                        >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-[#e0f2ef] text-[#2F4F4F] rounded-lg px-4 py-2">
                            <div className="flex space-x-2">
                                <div className="w-2 h-2 bg-[#2F4F4F] rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-[#2F4F4F] rounded-full animate-bounce delay-100" />
                                <div className="w-2 h-2 bg-[#2F4F4F] rounded-full animate-bounce delay-200" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-end gap-2">
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        className="flex-1 resize-none rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2F4F4F] min-h-[40px] max-h-[120px]"
                        rows={1}
                    />
                    <button
                        onClick={handleAskStream}
                        disabled={isLoading || !prompt.trim()}
                        className={`p-2 rounded-lg ${
                            isLoading || !prompt.trim()
                                ? 'bg-gray-200 text-gray-500'
                                : 'bg-[#2F4F4F] text-white hover:bg-[#1F3F3F]'
                        } transition-colors`}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};