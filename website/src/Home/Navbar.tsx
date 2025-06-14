import vinayaLogo from '../assets/vinayaJournal-removebg.png';

export const Navbar = () => {
    // const getOS = () => {
    //     const platform = window.navigator.userAgent.toLowerCase();
    //     if (platform.includes('mac')) return 'macOS';
    //     if (platform.includes('linux')) return 'Linux';
    //     return 'Windows';
    // };

    // const currentOS = getOS();

    return (
        <div className="w-full py-4">
            <div className="w-full max-w-6xl px-4 sm:px-6 mx-auto">
                <div className="rounded-2xl border border-white/20 bg-white/40 backdrop-blur-[2px] shadow-sm transition-all duration-300 hover:shadow-md hover:border-white/30">
                    <div className="flex flex-col sm:flex-row items-center p-5 sm:p-7 space-y-4 sm:space-y-0 sm:justify-between relative">
                        {/* Logo and Title Section */}
                        <div className="flex items-center space-x-4 sm:space-x-5">
                            <div className="relative">
                                <img 
                                    src={vinayaLogo} 
                                    alt="Vinaya Journal Logo" 
                                    className="h-14 sm:h-18 w-auto hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-2xl"></div>
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl sm:text-2xl font-serif tracking-wide text-gray-900 bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent" style={{ fontFamily: 'Times New Roman, serif' }}>
                                    VINAYA 
                                </h1>
                                <p className="text-sm sm:text-base text-gray-500/90 font-serif italic tracking-wide">
                                    <span>yours truly journaling companion</span>
                                </p>
                            </div>
                        </div>

                        {/* Download Buttons Section */}
                        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <p className="text-xs text-gray-500 mt-1 sm:mt-0">Currently only for Linux</p>
                            <button 
                                className="w-full sm:w-auto px-6 py-2.5 bg-[#2F4F4F] text-white rounded-xl hover:bg-[#1F3F3F] active:bg-[#0F2F2F] transition-all duration-200 font-medium flex items-center justify-center gap-3 group font-fira"
                                onClick={() => window.open('https://drive.google.com/uc?export=download&id=1dfzqUVsRvRzaXEskHK492CxfT28GcGP2', '_blank')}
                            >
                                <svg className="w-5 h-5 transform transition-transform group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                                </svg>
                                <span className="relative">
                                    Download for Linux
                                    <span className="absolute inset-x-0 -bottom-px h-px bg-white/50 transform origin-left transition-transform group-hover:scale-x-100 scale-x-0"></span>
                                </span>
                            </button>

                            <button className="w-full sm:w-auto px-5 py-2.5 border border-white/20 text-[#2F4F4F] rounded-xl hover:bg-white/20 hover:border-white/30 active:bg-white/30 transition-all duration-200 font-medium font-fira group relative">
                                <span>How to use</span>
                                <div className="absolute left-0 top-full mt-2 w-64 p-3 bg-white/90 text-sm text-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <p>This is an AppImage release for Linux.</p>
                                    <p>Other versions are getting tested.</p>
                                    <p>To run:</p>
                                    <ul className="list-disc pl-5">
                                        <li>Extract the tar file.</li>
                                        <li>Go to MyApp and run all three executables:</li>
                                    </ul>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}