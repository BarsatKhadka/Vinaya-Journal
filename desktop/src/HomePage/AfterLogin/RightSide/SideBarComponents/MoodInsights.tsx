import { useEffect, useState } from 'react';
import MoodInsightsBackground from '../../../../assets/BackgroundImages/MoodInsightsBackground.png';
import axios from 'axios';

type sentimentValue = [anger: number, disgust: number, fear: number, joy: number, neutral: number, sadness: number, surprise: number]

export const MoodInsights = () => {
    const [moodInsights, setMoodInsights] = useState([]);
    useEffect(() => {
        const fetchMoodInsights = async () => {
            const response = await axios.get(`http://localhost:8000/mood_insights?last_n_days=2`);
            const data = response.data;
            setMoodInsights(data);
        };
        fetchMoodInsights();
    }, []);

    return (
        <div
            className="flex flex-col items-center h-full relative bg-[#fae4b2]"
            style={{
                backgroundImage: `url(${MoodInsightsBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: '50% center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="absolute inset-0 bg-[#fae4b2]/50 pointer-events-none z-0" />
            <div className="relative z-10 flex flex-col items-center w-full">
                <h1 className="mb-4 text-xl font-serif text-[#2F4F4F] mt-8">Mood Insights</h1>
            </div>
            <div className="flex flex-col items-center">
                {moodInsights.map((mood: any) => (
                    <div key={mood.date}>
                        <h2>{mood.date}</h2>
                        {Object.entries(mood.sentiment as sentimentValue).map(([key, value]) => (
                            <p key={key}>{key}: {value}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};