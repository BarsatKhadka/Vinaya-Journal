export type MoodRecord = {
    date: string;
    sentiment: {
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
    };
};

export type TimeRange = {
    label: string;
    value: number;
};

export const SIGNIFICANT_SENTIMENT_THRESHOLD = 0.05;

export const EMOTIONS_LIST = [
    'admiration', 'amusement', 'anger', 'annoyance', 'approval', 'caring', 
    'confusion', 'curiosity', 'desire', 'disappointment', 'disapproval', 
    'disgust', 'embarrassment', 'excitement', 'fear', 'gratitude', 'grief', 
    'joy', 'love', 'nervousness', 'optimism', 'pride', 'realization', 
    'relief', 'remorse', 'sadness', 'surprise', 'neutral'
];

export const EMOTION_COLORS = [
    "#FFD700", "#FFA500", "#FF0000", "#FF4500", "#32CD32", "#FF69B4", 
    "#808080", "#00CED1", "#800080", "#708090", "#8B0000", "#006400", 
    "#FFC0CB", "#FFD700", "#4B0082", "#00FA9A", "#2F4F4F", "#F0E68C", 
    "#FF1493", "#D2691E", "#00BFFF", "#9400D3", "#1E90FF", "#98FB98", 
    "#A9A9A9", "#0000FF", "#FF00FF", "#A9A9A9"
];

export const timeRanges: TimeRange[] = [
    { label: 'Last 2 Days', value: 2 },
    { label: 'Last Week', value: 7 },
    { label: 'Last 2 Weeks', value: 14 },
    { label: 'Last Month', value: 30 }
];