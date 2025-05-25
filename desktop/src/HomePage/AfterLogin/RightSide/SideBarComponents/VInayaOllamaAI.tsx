import { useState } from "react";
import { useAppStore } from "../../../../store";


export const VInayaOllamaAI = () => {
    const [data, setData] = useState("")
    const [prompt, setPrompt] = useState("")
    const {currentModel} = useAppStore()


    const handleAskStream = async () => {
        setData("")
        const response:any = await fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/event-stream",
            },
            body: JSON.stringify({
            prompt: prompt,
            model_name: currentModel,
        })});

        const reader = response?.body?.getReader()
        const decoder = new TextDecoder("utf-8")
        while (true) {
            const {done, value} = await reader.read()
            if (done) break
            const chunk = decoder.decode(value, {stream: true})
            setData(prev => prev + chunk)
        }
    }
    return (
        <div>
            <h1>Vinaya Ollama AI</h1>
            <input
                type="text"
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                placeholder="Type your prompt..."
                className="border rounded px-2 py-1 mb-2 w-full"
            />
            <button onClick={handleAskStream}>Ask</button>
            <p>{data}</p>
        </div>
    );
};