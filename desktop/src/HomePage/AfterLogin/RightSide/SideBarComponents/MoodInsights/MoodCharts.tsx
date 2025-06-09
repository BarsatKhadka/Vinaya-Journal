import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar, Cell } from 'recharts';
import { useAppStore } from '../../../../../store';

interface MoodChartsProps {
    chartData: any;
}

const emotions = ["joy", "sadness", "anger", "fear", "surprise", "disgust", "neutral"];
const colors = [
    "#f59e0b",  
    "#3b82f6",  
    "#dc2626",  
    "#0891b2",  
    "#10b981",  
    "#7e22ce",  
    "#6b7280"   
];

export const MoodCharts: React.FC<MoodChartsProps> = ({ chartData }) => {
    const { chartDataType } = useAppStore();

    const transformAvgSentimentData = (data: any) => {
        if (!data) return [];
        return Object.entries(data).map(([emotion, value]) => ({
            label: emotion.charAt(0).toUpperCase() + emotion.slice(1),
            value: Number(value)
        }));
    };

    const transformDominantMoodData = (data: Record<string, string>) => {
        if (!data) return [];
        return Object.entries(data).map(([date, mood]) => ({
            date,
            mood: mood.charAt(0).toUpperCase() + mood.slice(1),
            value: 1,
            color: colors[emotions.indexOf(mood)] || '#6b7280'
        }));
    };

    return (
        <div className="w-full h-full mr-8 mt-4 ">
            <div className="w-full h-[400px]">
                {chartDataType === "Initial" && (
                <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e6cfa7" />
                        <XAxis 
                            dataKey="date" 
                            stroke="#2F4F4F"
                            tick={{ fill: '#2F4F4F', fontFamily: 'serif' }}
                        />
                        <YAxis 
                            domain={[0, 1]}
                            stroke="#2F4F4F"
                            tick={{ fill: '#2F4F4F', fontFamily: 'serif' }}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: '#fae4b2',
                                border: '1px solid #2F4F4F',
                                borderRadius: '4px',
                                fontFamily: 'serif'
                            }}
                        />
                        <Legend 
                            wrapperStyle={{ 
                                fontFamily: 'serif',
                                color: '#2F4F4F'
                            }}
                        />
                        {emotions.map((emotion, index) => (
                            <Line
                                key={emotion}
                                type="monotone"
                                dataKey={emotion}
                                stroke={colors[index]}
                                strokeWidth={2}
                                dot={{ fill: colors[index], strokeWidth: 2 }}
                                activeDot={{ r: 6, fill: colors[index] }}
                            />
                        ))}
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
                {chartDataType === "Average Sentiment" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={transformAvgSentimentData(chartData)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e6cfa7" />
                            <XAxis 
                                dataKey="label" 
                                stroke="#2F4F4F"
                                tick={{ fill: '#2F4F4F', fontFamily: 'serif' }}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis 
                                domain={[0, 1]}
                                stroke="#2F4F4F"
                                tick={{ fill: '#2F4F4F', fontFamily: 'serif' }}
                                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#fae4b2',
                                    border: '1px solid #2F4F4F',
                                    borderRadius: '4px',
                                    fontFamily: 'serif'
                                }}
                                formatter={(value: number) => [`${(value * 100).toFixed(1)}%`, 'Sentiment']}
                            />
                            <Legend 
                                wrapperStyle={{ 
                                    fontFamily: 'serif',
                                    color: '#2F4F4F'
                                }}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {transformAvgSentimentData(chartData)?.map((entry: any, index: number) => (
                                    <Cell 
                                        key={`cell-${index}`} 
                                        fill={colors[emotions.indexOf(entry.label.toLowerCase())] || '#6b7280'} 
                                    />
                                ))}
                            </Bar>
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
                {chartDataType === "Dominant Mood" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={transformDominantMoodData(chartData)}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e6cfa7" />
                            <XAxis 
                                dataKey="date" 
                                stroke="#2F4F4F"
                                tick={{ fill: '#2F4F4F', fontFamily: 'serif' }}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis 
                                hide={true}
                                domain={[0, 0.5]}
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#fae4b2',
                                    border: '1px solid #2F4F4F',
                                    borderRadius: '4px',
                                    fontFamily: 'serif'
                                }}
                                formatter={(value: number, name: string, props: any) => [
                                    props.payload.mood,
                                    'Dominant Mood'
                                ]}
                            />
                            <Legend 
                                wrapperStyle={{ 
                                    fontFamily: 'serif',
                                    color: '#2F4F4F'
                                }}
                            />
                            <Bar 
                                dataKey="value" 
                                radius={[4, 4, 0, 0]}
                                barSize={20}
                            >
                                {transformDominantMoodData(chartData)?.map((entry: any) => (
                                    <Cell 
                                        key={`cell-${entry.date}`} 
                                        fill={entry.color}
                                    />
                                ))}
                            </Bar>
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
                {chartDataType === "Daily Changes and Trends" && (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e6cfa7" />
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}