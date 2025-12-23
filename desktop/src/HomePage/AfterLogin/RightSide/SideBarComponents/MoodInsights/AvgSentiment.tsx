import React from "react";
import { useTranslation } from "react-i18next";
import { SIGNIFICANT_SENTIMENT_THRESHOLD } from "./mood";

interface AvgSentimentProps {
    avgSentiment: {
        admiration: number;
        amusement: number;
        anger: number;
        annoyance: number;
        approval: number;
        caring: number;
        confusion: number;
        curiosity: number;
        desire: number;
        disappointment: number;
        disapproval: number;
        disgust: number;
        embarrassment: number;
        excitement: number;
        fear: number;
        gratitude: number;
        grief: number;
        joy: number;
        love: number;
        nervousness: number;
        optimism: number;
        pride: number;
        realization: number;
        relief: number;
        remorse: number;
        sadness: number;
        surprise: number;
        neutral: number;
    } | null;
}

const getSentimentColor = (sentiment: string) => {
    const colors: Record<string, string> = {
        admiration: 'bg-[#e6ffe6] border-[#2F4F4F]',
        amusement: 'bg-[#e6ffe6] border-[#2F4F4F]',
        anger: 'bg-[#ffe6e6] border-[#2F4F4F]',
        annoyance: 'bg-[#ffe6e6] border-[#2F4F4F]',
        approval: 'bg-[#e6ffe6] border-[#2F4F4F]',
        caring: 'bg-[#e6ffe6] border-[#2F4F4F]',
        confusion: 'bg-[#e6f3ff] border-[#2F4F4F]',
        curiosity: 'bg-[#e6f3ff] border-[#2F4F4F]',
        desire: 'bg-[#e6ffe6] border-[#2F4F4F]',
        disappointment: 'bg-[#e6e6ff] border-[#2F4F4F]',
        disapproval: 'bg-[#ffe6e6] border-[#2F4F4F]',
        disgust: 'bg-[#f2e6ff] border-[#2F4F4F]',
        embarrassment: 'bg-[#e6e6ff] border-[#2F4F4F]',
        excitement: 'bg-[#e6ffe6] border-[#2F4F4F]',
        fear: 'bg-[#fff2e6] border-[#2F4F4F]',
        gratitude: 'bg-[#e6ffe6] border-[#2F4F4F]',
        grief: 'bg-[#e6e6ff] border-[#2F4F4F]',
        joy: 'bg-[#e6ffe6] border-[#2F4F4F]',
        love: 'bg-[#e6ffe6] border-[#2F4F4F]',
        nervousness: 'bg-[#fff2e6] border-[#2F4F4F]',
        optimism: 'bg-[#e6ffe6] border-[#2F4F4F]',
        pride: 'bg-[#e6ffe6] border-[#2F4F4F]',
        realization: 'bg-[#e6ffe6] border-[#2F4F4F]',
        relief: 'bg-[#e6ffe6] border-[#2F4F4F]',
        remorse: 'bg-[#e6e6ff] border-[#2F4F4F]',
        sadness: 'bg-[#e6e6ff] border-[#2F4F4F]',
        surprise: 'bg-[#e6f3ff] border-[#2F4F4F]',
        neutral: 'bg-[#fef1d6] border-[#2F4F4F]'
    };
    return colors[sentiment] || 'bg-[#fef1d6] border-[#2F4F4F]';
};

export const AvgSentiment: React.FC<AvgSentimentProps> = ({ avgSentiment }) => {
    const { t } = useTranslation();

    if (!avgSentiment) {
        return (
            <div className="mt-12 grid grid-cols-3 gap-3">
                {Array(6).fill(0).map((_, index) => (
                    <div 
                        key={index}
                        className="bg-[#fef1d6] border border-[#2F4F4F] rounded-lg p-2 animate-pulse"
                    >
                        <div className="h-4 bg-[#2F4F4F]/20 rounded w-3/4 mb-2"></div>
                        <div className="h-6 bg-[#2F4F4F]/20 rounded w-1/2"></div>
                    </div>
                ))}
            </div>
        );
    }

    const sortedSentiments = Object.entries(avgSentiment)
        .filter(([_, value]) => value > SIGNIFICANT_SENTIMENT_THRESHOLD)
        .sort(([, a], [, b]) => b - a);

    return (
        <div className="mt-12 grid grid-cols-3 gap-3">
            {sortedSentiments.map(([sentiment, value]) => (
                <div 
                    key={sentiment} 
                    className={`${getSentimentColor(sentiment)} border rounded-lg p-2 hover:opacity-80 transition-all opacity-80`}
                >
                    <div className="text-xs text-black" style={{fontFamily: 'Roboto'}}>
                        {t(`moodInsights.sentiments.${sentiment}`)}
                    </div>
                    <div className="text-lg font-medium text-black" style={{fontFamily: 'Roboto'}}>
                        {Math.round(value * 100)}%
                    </div>
                </div>
            ))}
        </div>
    )
}