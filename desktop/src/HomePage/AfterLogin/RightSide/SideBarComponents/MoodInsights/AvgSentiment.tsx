import React from "react";

interface AvgSentimentProps {
    avgSentiment: {
        neutral: number;
        surprise: number;
        joy: number;
        fear: number;
        anger: number;
        sadness: number;
        disgust: number;
    }
}

const getSentimentColor = (sentiment: string) => {
    const colors = {
        neutral: 'bg-[#fef1d6] border-[#2F4F4F]',
        surprise: 'bg-[#e6f3ff] border-[#2F4F4F]',
        joy: 'bg-[#e6ffe6] border-[#2F4F4F]',
        fear: 'bg-[#fff2e6] border-[#2F4F4F]',
        anger: 'bg-[#ffe6e6] border-[#2F4F4F]',
        sadness: 'bg-[#e6e6ff] border-[#2F4F4F]',
        disgust: 'bg-[#f2e6ff] border-[#2F4F4F]'
    };
    return colors[sentiment as keyof typeof colors] || 'bg-[#fef1d6] border-[#2F4F4F]';
};

export const AvgSentiment: React.FC<AvgSentimentProps> = ({ avgSentiment }) => {
    return (
        <div className="mt-12 grid grid-cols-3 gap-3">
            {Object.entries(avgSentiment).map(([sentiment, value]) => (
                <div 
                    key={sentiment} 
                    className={`${getSentimentColor(sentiment)} border rounded-lg p-2 hover:opacity-80 transition-all opacity-80`}
                >
                    <div className="text-xs text-black" style={{fontFamily: 'Roboto'}}>
                        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                    </div>
                    <div className="text-lg font-medium text-black" style={{fontFamily: 'Roboto'}}>
                        {value}
                    </div>
                </div>
            ))}
        </div>
    )
}