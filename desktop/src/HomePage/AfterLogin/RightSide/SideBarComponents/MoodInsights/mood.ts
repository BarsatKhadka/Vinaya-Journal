export type MoodRecord = {
    date: string;
    sentiment: {
        anger: number;
        disgust: number;
        fear: number;
        joy: number;
        neutral: number;
        sadness: number;
        surprise: number;
    };
};

export type TimeRange = {
    label: string;
    value: number;
};

export const timeRanges: TimeRange[] = [
    { label: 'Last 2 Days', value: 2 },
    { label: 'Last Week', value: 7 },
    { label: 'Last 2 Weeks', value: 14 },
    { label: 'Last Month', value: 30 }
]; 