import vinayaWithout from '../../../assets/vinayaWithout.png';
import { Home, History, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AfterLoginRightTopBar = () => {
    return (
        <div className="flex flex-col">
            <div className="backdrop-blur-[2px] px-6 py-1 border-b border-gray-200/90 bg-[#FDFBF7]">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo and Title */}
                    <div className="flex items-center md:gap-4 group">
                        <div className="rounded-full transition-transform duration-300 group-hover:scale-105">
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
                        <button className="p-2 text-gray-600 hover:text-white rounded-lg transition-all duration-200 hover:bg-[#2F4F4F] cursor-pointer">
                            <Home size={20} strokeWidth={1.5} />
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
        </div>
    );
};