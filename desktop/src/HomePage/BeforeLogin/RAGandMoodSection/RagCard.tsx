import PrivateSemanticSearch from "../../../assets/FeatureCardIcons/PrivateSemanticSearch.png";

export const RagCard = () => {
    return (
        <div className="flex flex-col items-center px-6 py-8 rounded-xl 
                        shadow-sm transition hover:shadow-md"
             style={{ backgroundColor: "#FCFBFA" }}>
            <div className="w-24 h-24 mb-6 transform transition-transform 
                        hover:scale-110 hover:rotate-3">
                <img
                    src={PrivateSemanticSearch}
                    alt="Contextual memory visualization"
                    className="w-full h-full object-contain drop-shadow-lg"
                />
            </div>

            <div className="text-center space-y-3">
                <h3 className="text-xl font-serif text-gray-800">
                    Contextual Memory 
                </h3>

                <p className="text-sm text-gray-700 tracking-wide max-w-xs" 
                   style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                    Recall what's meaningful with{' '}
                    <span className="text-[#2F4F4F] font-medium">built-in RAG</span>
                    <span className="block text-xs text-gray-500 mt-1 italic">
                        (Retrieval-Augmented Generation)
                    </span>
                </p>

                <p className="text-[11px] text-gray-500 italic mt-2" 
                   style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                    with previous journals stored securely on your device
                </p>

            </div>
        </div>
    );
};
