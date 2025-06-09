import { useState, useEffect } from "react";
import { useAppStore } from "../../../../../store";
import { Send, MessageSquare, Bot, User, X } from "lucide-react";
import VinayaOllamaAIBackground from "../../../../../assets/BackgroundImages/VinayaOllamaAIBackground.png"
import { InChatAIModelDropdown } from "./InChatAIModelDropdown";

interface Message {
    content: string;
    isUser: boolean;
}

const STORAGE_KEY = "vinaya-ai-chat-messages";

export const VInayaOllamaAI = () => {
    const [messages, setMessages] = useState<Message[]>(() => {
        const savedMessages = sessionStorage.getItem(STORAGE_KEY);
        return savedMessages ? JSON.parse(savedMessages) : [];
    });
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [abortController, setAbortController] = useState<AbortController | null>(null);
    const { currentModel, setCurrentModel, ollamaModels } = useAppStore();

    // Save messages to sessionStorage whenever they change
    useEffect(() => {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        if (ollamaModels.length > 0 && !currentModel) {
            setCurrentModel(ollamaModels[0]);
        }
    }, [ollamaModels, currentModel, setCurrentModel]);

    const handleAskStream = async () => {
        if (!prompt.trim() || !currentModel) return;

        // Create new AbortController for this request
        const controller = new AbortController();
        setAbortController(controller);

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
                }),
                signal: controller.signal
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
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    setMessages(prev => [...prev, { content: "Response stopped.", isUser: false }]);
                } else {
                    console.error("Error:", error);
                    setMessages(prev => [...prev, { content: "Sorry, something went wrong. Please try again.", isUser: false }]);
                }
            }
        } finally {
            setIsLoading(false);
            setAbortController(null);
        }
    };

    const handleStopGeneration = () => {
        if (abortController) {
            abortController.abort();
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
            <div className="absolute inset-0 bg-[#fae4b2]/50 pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col h-full">
                <div className="items-start pt-6 pb-2">
                    <InChatAIModelDropdown />
                </div>
                <div className="flex-1 flex flex-col items-center justify-between min-h-0">
                    <div className="w-full max-w-2xl flex flex-col h-full">
                        <div className="flex-1 overflow-y-auto px-2 md:px-0 py-4 space-y-6" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                            {messages.length === 0 && !isLoading ? (
                                <div className="flex flex-col items-center justify-start h-full pt-8 select-none" style={{fontFamily: 'Playfair Display'}}>
                                    <h2 className="text-lg md:text-3xl font-semibold mb-2 text-[#2F4F4F] text-center">Ready when you are.</h2>
                                    <p className="text-base md:text-lg text-[#6b7280] text-center">Ask anything.</p>
                                </div>
                            ) : (
                                messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-start gap-3 mt-4`}
                                    >
                                        {!message.isUser && (
                                            <div className="w-8 h-8 rounded-full bg-[#e0f2ef] flex items-center justify-center flex-shrink-0">
                                                <Bot className="w-5 h-5 text-[#2F4F4F]" strokeWidth={1.5} />
                                            </div>
                                        )}
                                        <div
                                            className={`max-w-[80%] rounded-xl px-6 py-4 ${
                                                message.isUser
                                                    ? 'bg-white text-[#2F4F4F] shadow-[0_2px_12px_0_#e6e1d5]'
                                                    : 'bg-[#e0f2ef] text-[#2F4F4F] shadow-[0_2px_12px_0_rgba(224,242,239,0.5)]'
                                            }`}
                                            style={{
                                                background: message.isUser 
                                                    ? 'repeating-linear-gradient(to bottom, #ffffff, #ffffff 28px, #f9f9f9 29px, #ffffff 30px)'
                                                    : 'repeating-linear-gradient(to bottom, #f0f7f5, #f0f7f5 28px, #e0f2ef 29px, #f0f7f5 30px)',
                                            }}
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-xs font-serif text-[#2F4F4F]/70">
                                                    {message.isUser ? 'You' : 'Vinaya AI'}
                                                </span>
                                            </div>
                                            <p className="text-base whitespace-pre-wrap font-serif leading-relaxed">
                                                {message.content}
                                            </p>
                                        </div>
                                        {message.isUser && (
                                            <div className="w-8 h-8 rounded-full bg-[#2F4F4F] flex items-center justify-center flex-shrink-0">
                                                <User className="w-5 h-5 text-white" strokeWidth={1.5} />
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                            {isLoading && (
                                <div className="flex justify-start items-start gap-3 mt-4">
                                    <div className="w-8 h-8 rounded-full bg-[#e0f2ef] flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-5 h-5 text-[#2F4F4F]" strokeWidth={1.5} />
                                    </div>
                                    <div className="bg-[#e0f2ef] text-[#2F4F4F] rounded-xl px-6 py-4 shadow-[0_2px_12px_0_rgba(224,242,239,0.5)]">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-xs font-serif text-[#2F4F4F]/70">
                                                Vinaya AI
                                            </span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="w-2 h-2 bg-[#2F4F4F] rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-[#2F4F4F] rounded-full animate-bounce delay-100" />
                                            <div className="w-2 h-2 bg-[#2F4F4F] rounded-full animate-bounce delay-200" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="w-full px-2 md:px-0 pb-6">
                    <div className="relative flex-grow max-w-2xl mx-auto">
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="w-full p-4 pl-12 pr-12 rounded-lg border border-[#e0f2ef] focus:ring-2 focus:ring-[#e0f2ef] focus:border-[#2F4F4F] outline-none font-serif transition-all duration-300 resize-none min-h-[40px] max-h-[120px]"
                            style={{
                                background: 'repeating-linear-gradient(to bottom, #f0f7f5, #f0f7f5 28px, #e0f2ef 29px, #f0f7f5 30px)',
                                boxShadow: '0 2px 12px 0 rgba(224, 242, 239, 0.5)',
                            }}
                            rows={1}
                        />
                        <MessageSquare
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#2F4F4F]"
                            strokeWidth={1.5}
                        />
                        {isLoading ? (
                            <button
                                onClick={handleStopGeneration}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg text-[#2F4F4F] hover:text-[#1F3F3F] transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleAskStream}
                                disabled={!prompt.trim() || !currentModel}
                                className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg ${
                                    !prompt.trim() || !currentModel
                                        ? 'text-[#bfa76a] cursor-not-allowed opacity-60'
                                        : 'text-[#2F4F4F] hover:text-[#1F3F3F]'
                                } transition-colors`}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};