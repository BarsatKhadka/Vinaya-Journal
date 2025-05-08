import vinayaLogo from '../assets/vinayaJournal-removebg.png';

export const Navbar = () => {
    const getOS = () => {
        const platform = window.navigator.platform.toLowerCase();
        if (platform.includes('mac')) return 'macOS';
        if (platform.includes('linux')) return 'Linux';
        return 'Windows';
    };

    const currentOS = getOS();

    return (
        <div className="flex flex-col pt-8 items-center min-h-screen bg-[#FAF9F6]">
            <div className="max-w-6xl w-full p-6 rounded-2xl border border-gray-200 bg-white shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <img 
                        src={vinayaLogo} 
                        alt="Vinaya Journal Logo" 
                        className="h-16 w-auto"
                    />
                    <div className="flex flex-col">
                        <h1 className="font-serif text-xl font-semibold tracking-wide text-gray-900">
                            VINAYA JOURNAL
                        </h1>
                        <p className="text-sm text-gray-500">
                            Your intelligent writing companion
                        </p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                        </svg>
                        Download for {currentOS}
                    </button>
                    <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        All downloads
                    </button>
                </div>
            </div>
        </div>
    );
}