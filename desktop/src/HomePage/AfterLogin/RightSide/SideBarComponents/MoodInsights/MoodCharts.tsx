import { Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

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
    return (
        <div className="w-full h-full mr-8 mt-4 ">
            <div className="w-full h-[400px]">
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
            </div>
        </div>
    )
}