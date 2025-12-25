import vinayaWithout from '../../../assets/vinayaWithout.png';
import { Home, History, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const AfterLoginRightTopBar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.altKey && e.key === 'ArrowLeft') {
                e.preventDefault(); 
                navigate('/');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigate]);

    return (
            <div className="backdrop-blur-[2px] px-8 py-1 bg-[var(--bg-main)] border-b border-[var(--border-color)]">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo and Title */}
                    <div className="flex items-center md:gap-1 group">
                        <div className="rounded-full transition-transform duration-300 group-hover:scale-105 ">
                            <img
                                src={vinayaWithout}
                                alt="Vinaya Logo"
                                className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 object-contain"
                            />
                        </div>
                        <h1 className="text-xl md:text-2xl font-serif font-medium tracking-wide">
                            <span className="text-[var(--text-main)]">
                                VINAYA
                            </span>
                        </h1>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex items-center gap-6">
                        <Link to="/">
                        <button className="p-2 text-[var(--text-main)] hover:text-[var(--text-on-accent)] rounded-lg transition-all duration-200 hover:bg-[var(--accent)] cursor-pointer group relative">
                            <Home size={20} strokeWidth={1.5} />
                            <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-[var(--accent)] text-[var(--text-on-accent)] text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                {t('topBar.homeTooltip')}
                            </span>
                        </button>
                        </Link>
                        <button className="p-2 text-[var(--text-main)] hover:text-[var(--text-on-accent)] rounded-lg transition-all duration-200 hover:bg-[var(--accent)] cursor-pointer">
                            <History size={20} strokeWidth={1.5} />
                        </button>
                        <Link to="/app/settings">
                        <button className="p-2 text-[var(--text-main)] hover:text-[var(--text-on-accent)] rounded-lg transition-all duration-200 hover:bg-[var(--accent)] cursor-pointer">
                            <Settings size={20} strokeWidth={1.5} />
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
    );
};