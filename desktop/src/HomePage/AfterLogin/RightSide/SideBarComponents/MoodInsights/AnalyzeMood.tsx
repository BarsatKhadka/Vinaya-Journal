import { BarChart, Activity, TrendingUp, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../../../../store'
import { AnalyzeMoodResults } from './AnalyzeMoodResults';

export const AnalyzeMood = () => {
    const { activeMoodTab, setActiveMoodTab } = useAppStore();

    const handleOverviewClick = () => {
        setTimeout(() => {
            setActiveMoodTab("Overview");
            window.location.reload();
        }, 100);
        
    };

    return (
        <div className="mt-8 mb-8 flex flex-col items-center">
            <button 
                onClick={handleOverviewClick}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-serif text-base cursor-pointer"
                style={{ WebkitTapHighlightColor: "transparent" }}
            >
                {activeMoodTab === 'Overview' && (
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
                    <BarChart className="w-4 h-4 text-[#2F4F4F]" />
                    <span className="text-sm font-medium text-[#2F4F4F]">
                        Overview
                    </span>
                </span>
            </button>
            <div className="mt-4 flex flex-row gap-3 z-99">
                <button 
                    onClick={() => setActiveMoodTab('Average Sentiment')}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-serif text-base cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                    {activeMoodTab === 'Average Sentiment' && (
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
                    onClick={() => setActiveMoodTab('Dominant Mood')}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-serif text-base cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                        {activeMoodTab === 'Dominant Mood' && (
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
                    onClick={() => setActiveMoodTab('Daily Changes and Trends')}
                    className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg font-serif text-base cursor-pointer"
                    style={{ WebkitTapHighlightColor: "transparent" }}
                >
                    {activeMoodTab === 'Daily Changes and Trends' && (
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
            <AnalyzeMoodResults />
        </div>
    )
}