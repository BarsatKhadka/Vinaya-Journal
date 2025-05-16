import BeginJournalingImage from "../../../assets/BeginJournalingPen.png";

export const BeginJournaling = () => {
    return (
        <div className="flex items-center px-6 py-8 rounded-xl 
                    shadow-sm transition hover:shadow-md"
             style={{ backgroundColor: "#FCFBFA" }}>
            
            {/* Left side image */}
            <div className="w-1/3 flex-shrink-0">
                <img
                    src={BeginJournalingImage}
                    alt="Begin journaling illustration"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Right side content */}
            <div className="flex-1 ml-6 space-y-3">
                <h3 className="text-xl font-serif text-gray-800">
                    Begin Journaling
                </h3>

                <p className="text-sm text-gray-600" 
                   style={{ fontFamily: '"Playfair Display", serif' }}>
                    Start your mindful writing journey with 
                    <span className="text-[#4caf50] font-medium"> Vinaya Journal</span>
                </p>

                <button className="mt-4 px-6 py-2 bg-[#2F4F4F] text-white rounded-lg 
                               hover:bg-[#1F3F3F] transition-colors text-sm"
                        style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                    Start Writing
                </button>
            </div>
        </div>
    );
};