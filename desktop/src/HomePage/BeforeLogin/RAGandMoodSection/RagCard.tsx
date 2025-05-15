import PrivateSemanticSearch from "../../../assets/FeatureCardIcons/PrivateSemanticSearch.png";

export const RagCard = () => {
    return (
        <div className="flex flex-col items-center px-6 py-8 bg-white/60 rounded-xl border border-gray-200 shadow-sm transition hover:shadow-md">

            <div className="w-14 h-14 mb-4">
                <img
                    src={PrivateSemanticSearch}
                    alt="Contextual memory icon"
                    className="w-full h-full object-contain opacity-90"
                />
            </div>

            <h3 className="text-xl font-serif text-gray-800 text-center">
                Contextual Memory 
            </h3>

            <p className="mt-2 text-center text-sm text-gray-600 font-light max-w-xs" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                Recall what's meaningful with built-in RAG (Retrieval-Augmented Generation) 
            </p>

            <p className="mt-4 text-[11px] text-gray-500 italic" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                with previous journals stored securely on your device.
            </p>
        </div>
    );
};
