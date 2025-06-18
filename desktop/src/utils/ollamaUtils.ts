import axios from "axios";

export const fetchOllamaModels = async (): Promise<string[]> => {
    try {
        const response = await axios.get("http://localhost:8000/models");
        return response?.data.models || [];
    } catch (error) {
        console.error("Error checking Ollama status:", error);
        return [];
    }
};

export const checkOllamaRunning = async () => {
    try {
        const response = await axios.get("http://localhost:8000/ollama");
        return response?.data;
    } catch (error) {
        console.error("Error checking Ollama status:", error);
        return false;
    }
}; 