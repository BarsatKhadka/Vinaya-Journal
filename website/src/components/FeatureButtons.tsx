import { Bot, CalendarClock, Home, LineChart, SquareTerminal } from "lucide-react";

interface FeatureButtonsProps {
  onSelectFeature: (feature: 'home' | 'ollama' | 'rag' | 'mood' | 'retrieve') => void;
  selectedFeature: 'home' | 'ollama' | 'rag' | 'mood' | 'retrieve';
}

const features = [
  { key: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
  { key: 'rag', label: 'Contextual RAG', icon: <SquareTerminal className="w-4 h-4" /> },
  { key: 'mood', label: 'Mood Insights', icon: <LineChart className="w-4 h-4" /> },
  { key: 'ollama', label: 'Vinaya AI', icon: <Bot className="w-4 h-4" /> },
  { key: 'retrieve', label: 'Past Entries', icon: <CalendarClock className="w-4 h-4" /> },
];

const FeatureButtons: React.FC<FeatureButtonsProps> = ({ onSelectFeature, selectedFeature }) => (
  <div className="w-full flex flex-row gap-3 justify-center items-center flex-wrap">
    {features.map((feature) => (
      <button
        key={feature.key}
        onClick={() => onSelectFeature(feature.key as any)}
        className={`relative flex flex-row items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm cursor-pointer overflow-hidden transition-all duration-300 backdrop-blur-sm border
          ${selectedFeature === feature.key 
            ? 'bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-lg border-teal-500/30 transform scale-105' 
            : 'hover:bg-white/30 text-teal-800 border-white/20 hover:border-white/40 hover:shadow-md'
          }
        `}
        style={{ 
          WebkitTapHighlightColor: "transparent",
          fontFamily: 'Inter, system-ui, sans-serif',
          fontWeight: selectedFeature === feature.key ? '600' : '500'
        }}
      >
        <span className="flex items-center gap-2">
          {feature.icon}
          <span>{feature.label}</span>
        </span>
      </button>
    ))}
  </div>
);

export default FeatureButtons;