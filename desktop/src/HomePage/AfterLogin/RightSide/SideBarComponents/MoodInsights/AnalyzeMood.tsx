import { BarChart, Activity } from 'lucide-react';

export const AnalyzeMood = () => {
    return (
        <div className="mt-8 mb-8 flex justify-center">
            <button
                className="flex items-center gap-2 px-12 py-3 z-99 rounded-full bg-[#2F4F4F] text-white font-serif hover:bg-[#2F4F4F]/90 group relative cursor-pointer"
            >
                <BarChart className="w-5 h-5 text-white absolute left-4 opacity-100 group-hover:opacity-0 transition-all duration-200" />
                <Activity className="w-5 h-5 text-white absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-200" />
                <span className="group-hover:-translate-x-4 transition-all duration-200">Analyze Mood with Pandas</span>
            </button>
        </div>
    )
}