import {useEffect, useState} from "react";

export const OllamaNotRunningCard = () => {
    const [osName,setOsName] = useState<string>("");

    useEffect(() =>{
        const getOsName = async () => {
            try{
                const osName = await window.ipcRenderer.invoke("get-os")
                setOsName(osName);
            }
            catch (error) {
                console.error("Error Getting os name: ", error);
            }   
        };
        getOsName();
    }, [])
    
    return (
        <div>
            Ollama AI is not running. {osName}
        </div>
    );
}