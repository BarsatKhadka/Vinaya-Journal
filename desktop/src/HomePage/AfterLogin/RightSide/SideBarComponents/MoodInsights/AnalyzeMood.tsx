import { BarChart, Activity, TrendingUp, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export const AnalyzeMood = () => {
    const [activeTab, setActiveTab] = useState<string | null>("dominant");

    return (
        <div className="mt-8 mb-8 flex flex-col items-center">
            <button
                className="flex items-center gap-2 px-12 py-3 z-99 rounded-full bg-[#2F4F4F] text-white font-serif hover:bg-[#2F4F4F]/90 group relative cursor-pointer"
            >
                <BarChart className="w-5 h-5 text-white absolute left-4 opacity-100 group-hover:opacity-0 transition-all duration-200" />
                <Activity className="w-5 h-5 text-white absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-200" />
                <span className="group-hover:-translate-x-4 transition-all duration-200">Analyze Mood with Pandas</span>
            </button>

            <div className="mt-4 flex flex-row gap-3 z-99">
                <button 
                    onClick={() => setActiveTab('average')}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-serif text-base cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                    {activeTab === 'average' && (
                        <motion.div
                            layoutId="moodTab"
                            className="absolute inset-0 rounded-lg"
                            style={{
                                background: 'repeating-linear-gradient(to bottom, #fef1d6, #fef1d6 28px, #f9e4b7 29px, #fef1d6 30px)',
                                boxShadow: '0 2px 12px 0 #e6e1d5',
                                border: '1px solid #2F4F4F'
                            }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#2F4F4F]" />
                        <span className="text-sm font-medium text-[#2F4F4F]">
                            Average Sentiment
                        </span>
                    </span>
                </button>
                
                <button 
                    onClick={() => setActiveTab('dominant')}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-serif text-base cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                    {activeTab === 'dominant' && (
                        <motion.div
                            layoutId="moodTab"
                            className="absolute inset-0 rounded-lg"
                            style={{
                                background: 'repeating-linear-gradient(to bottom, #fef1d6, #fef1d6 28px, #f9e4b7 29px, #fef1d6 30px)',
                                boxShadow: '0 2px 12px 0 #e6e1d5',
                                border: '1px solid #2F4F4F'
                            }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#2F4F4F]" />
                        <span className="text-sm font-medium text-[#2F4F4F]">
                            Dominant Mood
                        </span>
                    </span>
                </button>
                
                <button 
                    onClick={() => setActiveTab('daily')}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-serif text-base cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                    {activeTab === 'daily' && (
                        <motion.div
                            layoutId="moodTab"
                            className="absolute inset-0 rounded-lg"
                            style={{
                                background: 'repeating-linear-gradient(to bottom, #fef1d6, #fef1d6 28px, #f9e4b7 29px, #fef1d6 30px)',
                                boxShadow: '0 2px 12px 0 #e6e1d5',
                                border: '1px solid #2F4F4F'
                            }}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-[#2F4F4F]" />
                        <span className="text-sm font-medium text-[#2F4F4F]">
                            Daily Changes and Trends
                        </span>
                    </span>
                </button>
            </div>
        </div>
    )
}