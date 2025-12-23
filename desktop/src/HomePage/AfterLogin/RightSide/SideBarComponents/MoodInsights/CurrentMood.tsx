import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../../../../store';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EMOTIONS_LIST, EMOTION_COLORS, SIGNIFICANT_SENTIMENT_THRESHOLD } from './mood';

export const CurrentMood = () => {
    const { editorContent } = useAppStore();
    const [currentSentiment, setCurrentSentiment] = useState<any>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const fetchCurrentSentiment = async () => {
            if (!editorContent) {
                setCurrentSentiment(null);
                return;
            }
            try {
                const response = await axios.post('http://localhost:8000/analyze_text_sentiment', {
                    text: editorContent
                });
                setCurrentSentiment(response.data);
            } catch (error) {
                console.error('Error fetching current sentiment:', error);
            }
        };
        
        const timeoutId = setTimeout(() => {
            fetchCurrentSentiment();
        }, 1000); // Debounce for 1 second

        return () => clearTimeout(timeoutId);
    }, [editorContent]);

    const transformData = (data: any) => {
        if (!data) return [];
        return Object.entries(data)
            .filter(([_, value]) => {
                const val = Number(value);
                return !isNaN(val) && val > SIGNIFICANT_SENTIMENT_THRESHOLD;
            })
            .map(([emotion, value]) => ({
                name: t(`moodInsights.sentiments.${emotion}`),
                value: Number(value),
                originalEmotion: emotion
            }))
            .sort((a, b) => b.value - a.value);
    };

    const chartData = transformData(currentSentiment);

    if (!editorContent) {
        return (
            <div className="text-center mt-8 text-[#2F4F4F] font-serif">
                {t('moodInsights.startWritingToSeeMood')}
            </div>
        );
    }

    if (!currentSentiment || chartData.length === 0) {
        return (
             <div className="text-center mt-8 text-[#2F4F4F] font-serif">
                {t('moodInsights.notEnoughData')}
            </div>
        );
    }

    return (
        <div className="mt-4 w-full h-[200px]">
            <h3 className="text-lg font-serif text-[#2F4F4F] mb-2 text-center">{t('moodInsights.currentMoodFromText')}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={EMOTION_COLORS[EMOTIONS_LIST.indexOf(entry.originalEmotion)] || '#6b7280'} 
                            />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: '#fae4b2',
                            border: '1px solid #2F4F4F',
                            borderRadius: '4px',
                            fontFamily: 'serif'
                        }}
                        formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                    />
                    <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ 
                            fontFamily: 'serif',
                            color: '#2F4F4F',
                            fontSize: '12px'
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
