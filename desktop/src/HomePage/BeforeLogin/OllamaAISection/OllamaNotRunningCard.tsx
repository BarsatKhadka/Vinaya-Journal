import { useEffect, useState } from "react";

const ReportBrokenLink = () => (
    <div className="text-center mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
            Found a broken link?{' '}
            <a
                href="https://github.com/BarsatKhadka/Vinaya-Journal/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2F4F4F] hover:text-[#1F3F3F] underline decoration-dotted"
            >
                Report it
            </a>
        </p>
    </div>
);

const MacOSCard = () => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-start">
                <div className="w-full">
                    <h3 className="text-lg font-serif text-gray-800 mb-4">macOS Installation</h3>
                    
                    <div className="space-y-6">
                        {/* Homebrew Option */}
                        <div className="border-l-2 border-[#2F4F4F] pl-4">
                            <h4 className="text-sm font-medium text-gray-700" 
                                style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                                Via Homebrew (Recommended)
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 italic" 
                               style={{fontFamily: 'Fira Sans'}}>
                                Install using Homebrew package manager
                            </p>
                            <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm">
                                brew install ollama
                            </div>
                        </div>

                        {/* Direct Download Option */}
                        <div className="border-l-2 border-[#2F4F4F] pl-4">
                            <h4 className="text-sm font-medium text-gray-700"
                                style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                                Direct Download
                            </h4>
                            <p className="text-xs text-gray-500 mt-1 italic" 
                               style={{fontFamily: 'Fira Sans'}}>
                                Download and install manually
                            </p>
                            <a
                                href="https://ollama.com/download/Ollama-darwin.zip"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center text-[#2F4F4F] hover:text-[#1F3F3F] 
                                         text-sm transition-colors underline"
                                style={{ fontFamily: '"Fira Sans", sans-serif' }}
                            >
                                Download for macOS
                                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" 
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" 
                                          strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <ReportBrokenLink />
        </div>
    );
};

const LinuxCard = () => (
    <div className="p-4">
        <div className="flex justify-between items-start">
            <div className="w-full">
                <h3 className="text-lg font-serif text-gray-800 mb-4">Linux Installation</h3>
                
                <div className="space-y-6">
                    {/* Snap Option */}
                    <div className="border-l-2 border-[#2F4F4F] pl-4">
                        <h4 className="text-sm font-medium text-gray-700" 
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            Via Snap (Recommended)
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 italic" 
                           style={{fontFamily: 'Fira Sans'}}>
                            Install using Snap package manager
                        </p>
                        <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm">
                            sudo snap install ollama
                        </div>
                    </div>

                    {/* Shell Script Option */}
                    <div className="border-l-2 border-[#2F4F4F] pl-4">
                        <h4 className="text-sm font-medium text-gray-700"
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            Via Shell Script
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 italic" 
                           style={{fontFamily: 'Fira Sans'}}>
                            Install using the official install script
                        </p>
                        <div className="mt-2 p-2 bg-gray-100 rounded font-mono text-sm">
                            curl https://ollama.ai/install.sh | sh
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ReportBrokenLink />
    </div>
);

const WindowsCard = () => (
    <div className="p-4">
        <div className="flex justify-between items-start">
            <div className="w-full">
                <h3 className="text-lg font-serif text-gray-800 mb-4">Windows Installation</h3>
                
                <div className="space-y-6">
                    {/* Windows Download Option */}
                    <div className="border-l-2 border-[#2F4F4F] pl-4">
                        <h4 className="text-sm font-medium text-gray-700"
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            Windows Installer
                        </h4>
                        <p className="text-xs text-gray-500 mt-1 italic" 
                           style={{fontFamily: 'Fira Sans'}}>
                            Download and run the Windows installer 
                        </p>
                        <a
                            href="https://ollama.com/download/OllamaSetup.exe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center text-[#2F4F4F] hover:text-[#1F3F3F] 
                                     text-sm transition-colors underline"
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}
                        >
                            Download Windows Installer For Ollama
                            <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" 
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" 
                                      strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <ReportBrokenLink />
    </div>
);

export const OllamaNotRunningCard = () => {
    const [osName, setOsName] = useState<string>("");

    useEffect(() => {
        const getOsName = async () => {
            try {
                const osName = await window.ipcRenderer.invoke("get-os");
                setOsName(osName);
            } catch (error) {
                console.error("Error Getting os name: ", error);
            }
        };
        getOsName();
    }, []);

    const renderOSCard = () => {
        switch (osName) {
            case 'darwin':
                return <MacOSCard />;
            case 'linux':
                return <LinuxCard />;
            case 'win32':
                return <WindowsCard />;
            default:
                return (
                    <div className="p-4">
                        <div className="w-full">
                            <h3 className="text-lg font-serif text-gray-800 mb-4">
                                System OS detection failed
                            </h3>
                            
                            <p className="text-sm text-gray-600 mb-4" style={{fontFamily: 'Fira Sans'}}>
                                Please choose your operating system below to get installation instructions:
                            </p>

                            <div className="space-y-4">
                                <a href="https://ollama.com/download/mac"
                                   className="block text-[#2F4F4F] hover:text-[#1F3F3F] underline"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{fontFamily: 'Fira Sans'}}
                                >
                                    → Download for macOS
                                </a>
                                <a href="https://ollama.com/download/linux"
                                   className="block text-[#2F4F4F] hover:text-[#1F3F3F] underline"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{fontFamily: 'Fira Sans'}}
                                >
                                    → Download for Linux
                                </a>
                                <a href="https://ollama.com/download/windows"
                                   className="block text-[#2F4F4F] hover:text-[#1F3F3F] underline"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{fontFamily: 'Fira Sans'}}
                                >
                                    → Download for Windows 
                                </a>
                            </div>
                        </div>
                        <ReportBrokenLink />
                    </div>
                );
        }
    };

    return (
        <div className="px-2 py-2">
            <div className="bg-[#F7F4F0] border border-gray-400 rounded-lg">
                {renderOSCard()}
            </div>
        </div>
    );
};