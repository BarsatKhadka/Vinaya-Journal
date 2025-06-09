import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../../store';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Settings: React.FC = () => {
    const { setSelectedSidebar } = useAppStore();

    return (
        <div className="flex h-screen bg-[#fae4b2]/30">
            {/* Left Sidebar */}
            <div className="w-48 bg-white border-r border-[#2F4F4F]/20 p-4">
                <Link to="/app" className="flex items-center space-x-2 text-[#2F4F4F] font-serif mb-6 hover:text-[#2F4F4F]/80">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </Link>
                
                <div className="space-y-2">
                    <motion.button
                        className="w-full text-left px-3 py-2 rounded-lg bg-[#2F4F4F] text-white font-serif"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        About
                    </motion.button>
                </div>
            </div>

            {/* Right Content Area */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="flex flex-col bg-white rounded-xl shadow-lg p-8 max-w-[600px] w-full">
                    {/* About Section */}
                    <div className="space-y-6">
                        <h2 className="text-[#2F4F4F] font-serif text-2xl">About Vinaya Journal</h2>
                        
                        <div className="space-y-4">
                            <div className="bg-[#fae4b2]/30 rounded-lg p-4 border border-[#2F4F4F]/20">
                                <h3 className="text-[#2F4F4F] font-serif text-lg mb-2">Version</h3>
                                <p className="text-[#2F4F4F] font-serif">1.0.0</p>
                            </div>

                            <div className="bg-[#fae4b2]/30 rounded-lg p-4 border border-[#2F4F4F]/20">
                                <h3 className="text-[#2F4F4F] font-serif text-lg mb-2">Description</h3>
                                <p className="text-[#2F4F4F] font-serif">
                                    Vinaya Journal is your personal Local AI-powered journaling companion, made for data privacy while using AI.
                                </p>
                            </div>

                            <div className="bg-[#fae4b2]/30 rounded-lg p-4 border border-[#2F4F4F]/20">
                                <h3 className="text-[#2F4F4F] font-serif text-lg mb-2">Copyright</h3>
                                <p className="text-[#2F4F4F] font-serif">Open Source , Free to use and contribute.</p>
                                <p className="text-[#2F4F4F] font-serif">You can modify the code and use it for your own purposes but please don't sell it.</p>
                                <p className="text-[#2F4F4F] font-serif">Also please don't use it for any illegal purposes.</p>
                                <p className="text-[#2F4F4F] font-serif">And also please give credits to all contributors if you use it somewhere else because our good friends are working hard to make this project better.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};