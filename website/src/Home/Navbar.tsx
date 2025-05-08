import vinayaLogo from '../assets/vinayaJournal-removebg.png';

export const Navbar = () => {
    // Detect OS
    const getOS = () => {
        const platform = window.navigator.platform.toLowerCase();
        if (platform.includes('mac')) return 'macOS';
        if (platform.includes('linux')) return 'Linux';
        return 'Windows';
    };

    const currentOS = getOS();

    return (
        <div className="flex flex-col pt-8 items-center h-screen">
            <div className="max-w-6xl w-full p-2 rounded-2xl border border-gray-200 bg-white shadow-sm flex items-center justify-between">
                <div className="flex items-center">
                    <img src={vinayaLogo} alt="Vinaya Journal Logo" className="h-20" />
                    <p>VINAYA JOURNAL</p>
                </div>
                
                <div className="flex items-center gap-4 pr-4">
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                        Download for {currentOS}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        All downloads
                    </button>
                </div>
            </div>
        </div>
    );
}