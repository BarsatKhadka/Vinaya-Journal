export const OllamaAIModelDropdown = () => {
    return (
        <div>
                <label className="block text-sm font-serif text-[#2F4F4F] mb-2 ml-1">Ollama AI Model</label>
                <select
                    className="w-full px-3 py-2 rounded-md border border-gray-300 bg-white text-[#2F4F4F] font-serif text-sm focus:outline-none focus:ring-2 focus:ring-[#2F4F4F]"
                    defaultValue="Mistral 78"
                >
                    <option value="Mistral 78">Mistral 78</option>
                    <option value="Llama 3">Llama 3</option>
                    <option value="Phi 3">Phi 3</option>
                </select>
            </div>
    );
};