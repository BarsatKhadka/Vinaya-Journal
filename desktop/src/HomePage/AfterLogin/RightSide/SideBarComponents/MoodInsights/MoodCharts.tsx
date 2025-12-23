import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Bar, Cell, ReferenceLine, Area } from 'recharts';
import { useAppStore } from '../../../../../store';
import { useTranslation } from 'react-i18next';
import { SIGNIFICANT_SENTIMENT_THRESHOLD, EMOTIONS_LIST, EMOTION_COLORS } from './mood';

interface MoodChartsProps {
    chartData: any;
}

export const MoodCharts: React.FC<MoodChartsProps> = ({ chartData }) => {
    const { t } = useTranslation();
    const { chartDataType, selectedMood } = useAppStore();

    const transformAvgSentimentData = (data: any) => {
        if (!data) return [];
        return Object.entries(data)
            .filter(([_, value]) => {
                const val = Number(value);
                return !isNaN(val) && val > SIGNIFICANT_SENTIMENT_THRESHOLD;
            })
            .map(([emotion, value]) => ({
                label: t(`moodInsights.sentiments.${emotion}`),
                originalEmotion: emotion,
                value: Number(value)
            }));
    };

    const transformDominantMoodData = (data: Record<string, string>) => {
        if (!data) return [];
        return Object.entries(data).map(([date, mood]) => ({
            date,
            mood: t(`moodInsights.sentiments.${mood}`),
            value: 1,
            color: EMOTION_COLORS[EMOTIONS_LIST.indexOf(mood)] || '#6b7280'
        }));
    };

    const transformDailyChangesData = (data: Record<string, Record<string, number>>) => {
        if (!data || !selectedMood) return [];
        const moodData = data[selectedMood];
        if (!moodData) return [];
        
        return Object.entries(moodData).map(([date, value]) => ({
            date,
            value: Number(value),
            color: value >= 0 ? EMOTION_COLORS[EMOTIONS_LIST.indexOf(selectedMood)] : '#dc2626'
        }));
    };

    const getSignificantEmotions = () => {
        if (!chartData || !Array.isArray(chartData)) return EMOTIONS_LIST;
        
        const significantEmotions = new Set<string>();
        chartData.forEach(entry => {
            EMOTIONS_LIST.forEach(emotion => {
                const val = Number(entry[emotion]);
                if (!isNaN(val) && val > SIGNIFICANT_SENTIMENT_THRESHOLD) {
                    significantEmotions.add(emotion);
                }
            });
        });
        
        return EMOTIONS_LIST.filter(e => significantEmotions.has(e));
    };

    const visibleEmotions = getSignificantEmotions();

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
                        {visibleEmotions.map((emotion) => {
                            const index = EMOTIONS_LIST.indexOf(emotion);
                            return (
                                <Line
                                    key={emotion}
                                    type="monotone"
                                    dataKey={emotion}
                                    name={t(`moodInsights.sentiments.${emotion}`)}
                                    stroke={EMOTION_COLORS[index]}
                                    strokeWidth={2}
                                    dot={{ fill: EMOTION_COLORS[index], strokeWidth: 2 }}
                                    activeDot={{ r: 6, fill: EMOTION_COLORS[index] }}
                                />
                            );
                        })}
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
                                        fill={EMOTION_COLORS[EMOTIONS_LIST.indexOf(entry.originalEmotion)] || '#6b7280'} 
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
                                formatter={(_value: number, _name: string, props: any) => [
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
                        <ComposedChart data={transformDailyChangesData(chartData)}>
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
                                stroke="#2F4F4F"
                                tick={{ fill: '#2F4F4F', fontFamily: 'serif' }}
                                tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
                            />
                            <ReferenceLine y={0} stroke="#2F4F4F" strokeDasharray="3 3" />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: '#fae4b2',
                                    border: '1px solid #2F4F4F',
                                    borderRadius: '4px',
                                    fontFamily: 'serif'
                                }}
                                formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Change']}
                            />
                            <Legend 
                                wrapperStyle={{ 
                                    fontFamily: 'serif',
                                    color: '#2F4F4F',
                                    fontSize: '0px'
                                }}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={EMOTION_COLORS[EMOTIONS_LIST.indexOf(selectedMood)]}
                                fill={EMOTION_COLORS[EMOTIONS_LIST.indexOf(selectedMood)]}
                                fillOpacity={0.2}
                            />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke={EMOTION_COLORS[EMOTIONS_LIST.indexOf(selectedMood)]}
                                strokeWidth={2}
                                dot={{ fill: EMOTION_COLORS[EMOTIONS_LIST.indexOf(selectedMood)], strokeWidth: 2 }}
                                activeDot={{ r: 6, fill: EMOTION_COLORS[EMOTIONS_LIST.indexOf(selectedMood)] }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}