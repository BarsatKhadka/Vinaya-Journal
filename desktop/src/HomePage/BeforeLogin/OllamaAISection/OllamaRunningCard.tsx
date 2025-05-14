import { useEffect , useState } from "react";
import axios from "axios";

export const OllamaRunningCard = () => {
    const [ollamaModels, setOllamaModels] = useState<any[]>([]);
    
    useEffect(() => {
        const checkOllamaModels = async () => {
            try {
                const response = await axios.get("http://localhost:8000/models");
                setOllamaModels(response?.data.models || []);
            } catch (error) {
                console.error("Error checking Ollama status:", error);
            }
        };
        checkOllamaModels();
    }, []);
        return (
        <div>
            
            {ollamaModels.length == 0 ?
                <div className="text-red-500">
                    No models found. Please pull a model
                    </div>
                    :
                    <div className="text-green-500">
                        {ollamaModels.map((model, index) => (
                            <div key={index} className="text-black">
                                {model}
                            </div>
                        ))}
                    </div>
            }
        </div>

    );
}