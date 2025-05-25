import ContextualRAGBackground from '../../../../assets/BackgroundImages/COntextualRAGBackground.png';

export const ContextualRAG = () => {
    return (
        <div
            className="flex flex-col items-center h-full relative "
            style={{
                backgroundImage: `url(${ContextualRAGBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-[#f7f4f0]/70 pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col items-center w-full">
                <h1 className="mb-4 text-xl font-serif text-[#2F4F4F] mt-8">Contextual RAG</h1>
            </div>
        </div>
    );
};