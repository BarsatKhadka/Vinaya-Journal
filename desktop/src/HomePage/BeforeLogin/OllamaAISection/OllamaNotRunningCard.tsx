import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ReportBrokenLink = () => {
    const { t } = useTranslation();
    return (
    <div className="text-center mt-4 pt-4 border-t border-[var(--border-color)]">
        <p className="text-xs text-[var(--text-muted)]" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
            {t('features.localAI.brokenLink')}{' '}
            <a
                href="https://github.com/BarsatKhadka/Vinaya-Journal/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-main)] hover:text-[var(--text-main)] underline decoration-dotted"
            >
                {t('features.localAI.reportIt')}
            </a>
        </p>
    </div>
)};

const MacOSCard = () => {
    const { t } = useTranslation();
    return (
        <div className="p-4">
            <div className="flex justify-between items-start">
                <div className="w-full">
                    <h3 className="text-lg font-serif text-[var(--text-main)] mb-4">{t('features.localAI.macOSInstallation')}</h3>
                    
                    <div className="space-y-6">
                        {/* Homebrew Option */}
                        <div className="border-l-2 border-[var(--border-color)] pl-4">
                            <h4 className="text-sm font-medium text-[var(--text-main)]" 
                                style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                                {t('features.localAI.viaHomebrew')}
                            </h4>
                            <p className="text-xs text-[var(--text-muted)] mt-1 italic" 
                               style={{fontFamily: 'Fira Sans'}}>
                                {t('features.localAI.installHomebrew')}
                            </p>
                            <div className="mt-2 p-2 bg-[var(--bg-card)] rounded font-mono text-sm">
                                brew install ollama
                            </div>
                        </div>

                        {/* Direct Download Option */}
                        <div className="border-l-2 border-[var(--border-color)] pl-4">
                            <h4 className="text-sm font-medium text-[var(--text-main)]"
                                style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                                {t('features.localAI.directDownload')}
                            </h4>
                            <p className="text-xs text-[var(--text-muted)] mt-1 italic" 
                               style={{fontFamily: 'Fira Sans'}}>
                                {t('features.localAI.downloadManually')}
                            </p>
                            <a
                                href="https://ollama.com/download/Ollama-darwin.zip"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 inline-flex items-center text-[var(--text-main)] hover:text-[var(--text-main)] 
                                         text-sm transition-colors underline"
                                style={{ fontFamily: '"Fira Sans", sans-serif' }}
                            >
                                {t('features.localAI.downloadMacOS')}
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

const LinuxCard = () => {
    const { t } = useTranslation();
    return (
    <div className="p-4">
        <div className="flex justify-between items-start">
            <div className="w-full">
                <h3 className="text-lg font-serif text-[var(--text-main)] mb-4">{t('features.localAI.linuxInstallation')}</h3>
                
                <div className="space-y-6">
                    {/* Snap Option */}
                    <div className="border-l-2 border-[var(--border-color)] pl-4">
                        <h4 className="text-sm font-medium text-[var(--text-main)]" 
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            {t('features.localAI.viaSnap')}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1 italic" 
                           style={{fontFamily: 'Fira Sans'}}>
                            {t('features.localAI.installSnap')}
                        </p>
                        <div className="mt-2 p-2 bg-[var(--bg-card)] rounded font-mono text-sm">
                            sudo snap install ollama
                        </div>
                    </div>

                    {/* Shell Script Option */}
                    <div className="border-l-2 border-[var(--border-color)] pl-4">
                        <h4 className="text-sm font-medium text-[var(--text-main)]"
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            {t('features.localAI.viaShellScript')}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1 italic" 
                           style={{fontFamily: 'Fira Sans'}}>
                            {t('features.localAI.installShellScript')}
                        </p>
                        <div className="mt-2 p-2 bg-[var(--bg-card)] rounded font-mono text-sm">
                            curl https://ollama.ai/install.sh | sh
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ReportBrokenLink />
    </div>
)};

const WindowsCard = () => {
    const { t } = useTranslation();
    return (
    <div className="p-4">
        <div className="flex justify-between items-start">
            <div className="w-full">
                <h3 className="text-lg font-serif text-[var(--text-main)] mb-4">{t('features.localAI.windowsInstallation')}</h3>
                
                <div className="space-y-6">
                    {/* Windows Download Option */}
                    <div className="border-l-2 border-[var(--border-color)] pl-4">
                        <h4 className="text-sm font-medium text-[var(--text-main)]"
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            {t('features.localAI.windowsInstaller')}
                        </h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1 italic" 
                           style={{fontFamily: 'Fira Sans'}}>
                            {t('features.localAI.downloadWindowsInstaller')}
                        </p>
                        <a
                            href="https://ollama.com/download/OllamaSetup.exe"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center text-[var(--text-main)] hover:text-[var(--text-main)] 
                                     text-sm transition-colors underline"
                            style={{ fontFamily: '"Fira Sans", sans-serif' }}
                        >
                            {t('features.localAI.downloadWindows')}
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
)};

export const OllamaNotRunningCard = () => {
    const [osName, setOsName] = useState<string>("");
    const { t } = useTranslation();

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
                            <h3 className="text-lg font-serif text-[var(--text-main)] mb-4">
                                {t('features.localAI.osDetectionFailed')}
                            </h3>
                            
                            <p className="text-sm text-[var(--text-muted)] mb-4" style={{fontFamily: 'Fira Sans'}}>
                                {t('features.localAI.chooseOS')}
                            </p>

                            <div className="space-y-4">
                                <a href="https://ollama.com/download/mac"
                                   className="block text-[var(--text-main)] hover:text-[var(--text-main)] underline"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{fontFamily: 'Fira Sans'}}
                                >
                                    → {t('features.localAI.downloadMacOS')}
                                </a>
                                <a href="https://ollama.com/download/linux"
                                   className="block text-[var(--text-main)] hover:text-[var(--text-main)] underline"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{fontFamily: 'Fira Sans'}}
                                >
                                    → {t('features.localAI.downloadLinux')}
                                </a>
                                <a href="https://ollama.com/download/windows"
                                   className="block text-[var(--text-main)] hover:text-[var(--text-main)] underline"
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   style={{fontFamily: 'Fira Sans'}}
                                >
                                    → {t('features.localAI.downloadWindows')}
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
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg">
                {renderOSCard()}
            </div>
        </div>
    );
};