import vinayaWithout from '../../../assets/vinayaWithout.png';
import { Home, History, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const AfterLoginRightTopBar = () => {
    const navigate = useNavigate();

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
            <div className="backdrop-blur-[2px] px-8 py-1 border-b border-gray-200/90 bg-[#FDFBF7]">
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
                            <span className="text-gray-900 bg-gradient-to-r from-teal-700 to-slate-700 bg-clip-text text-transparent">
                                VINAYA
                            </span>
                        </h1>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex items-center gap-6">
                        <Link to="/">
                        <button className="p-2 text-gray-600 hover:text-white rounded-lg transition-all duration-200 hover:bg-[#2F4F4F] cursor-pointer group relative">
                            <Home size={20} strokeWidth={1.5} />
                            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Alt + ← (Left Arrow)
                            </span>
                        </button>
                        </Link>
                        <button className="p-2 text-gray-600 hover:text-white rounded-lg transition-all duration-200 hover:bg-[#2F4F4F] cursor-pointer">
                            <History size={20} strokeWidth={1.5} />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-white rounded-lg transition-all duration-200 hover:bg-[#2F4F4F] cursor-pointer">
                            <Settings size={20} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>
    );
};