import { useState } from "react";

export const VInayaOllamaAI = () => {
    const [data, setData] = useState("")

    const handleAskStream = async () => {
        setData("")
        const response:any = await fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "text/event-stream",
            },
            body: JSON.stringify({
            prompt: "what is curl",
            model_name: "phi3:latest",
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
            <button onClick={handleAskStream}>Ask</button>
            <p>{data}</p>
        </div>
    );
};