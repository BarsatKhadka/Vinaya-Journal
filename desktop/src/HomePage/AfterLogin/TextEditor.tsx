export const TextEditor = () => {
    return (
        <textarea 
            className="w-full h-full bg-transparent border-none outline-none resize-none
                      text-gray-700 placeholder-gray-400 font-serif p-8"
            placeholder="Start writing your thoughts..."
            style={{ fontFamily: 'Fira Sans, serif' }}
        />
    );
}; 