import { motion } from "framer-motion"
import { ArrowRight, Download, Terminal } from "lucide-react"
import LocalAiMemory from "../../assets/FeatureCardIcons/LocalAiMemory.png"

export const LocalAIFeature = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col p-6 rounded-xl
                    bg-white/40 backdrop-blur-[2px] border border-white/20
                    shadow-sm transition hover:shadow-md"
        >
            {/* Icon and Title Row */}
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex-shrink-0">
                    <img
                        src={LocalAiMemory}
                        alt="Local AI Memory icon"
                        className="w-full h-full object-contain"
                    />
                </div>
                <h3 className="text-base md:text-lg lg:text-2xl font-medium text-gray-800 font-serif">
                    Locally Setup Ollama AI
                </h3>
            </div>

            <p className="text-xs md:text-sm lg:text-base text-gray-600 pl-11 md:pl-12 lg:pl-14">
                <span style={{ fontFamily: '"Playfair Display", serif', color: 'inherit' , fontWeight: '500' }}>
                    all processing happens <span style={{ color: '#4caf50',fontWeight: '600' }}>locally on your device</span>
                </span>
            </p>

            {/* Installation Steps */}
            <div className="mt-6 space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#2F4F4F]/5 border border-[#2F4F4F]/10">
                    <div className="p-2 bg-[#2F4F4F]/10 rounded-lg">
                        <Download className="w-5 h-5 text-[#2F4F4F]" />
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-[#2F4F4F] mb-1">1. Install Ollama</h4>
                        <p className="text-xs text-[#2F4F4F]/70" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            Download and install Ollama from{' '}
                            <a 
                                href="https://ollama.ai/download" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#2F4F4F] hover:text-[#1F3F3F] underline"
                            >
                                ollama.ai
                            </a>
                        </p>
                    </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-[#2F4F4F]/5 border border-[#2F4F4F]/10">
                    <div className="p-2 bg-[#2F4F4F]/10 rounded-lg">
                        <Terminal className="w-5 h-5 text-[#2F4F4F]" />
                    </div>
                    <div>
                        <h4 className="text-sm font-medium text-[#2F4F4F] mb-1">2. Pull a Model</h4>
                        <p className="text-xs text-[#2F4F4F]/70" style={{ fontFamily: '"Fira Sans", sans-serif' }}>
                            Run in terminal: <code className="bg-[#2F4F4F]/10 px-1.5 py-0.5 rounded">ollama pull mistral</code>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                    <a 
                        href="https://github.com/ollama/ollama"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 
                                 text-[#2F4F4F] hover:text-[#1F3F3F]
                                 rounded-lg border border-[#2F4F4F]/20
                                 hover:border-[#2F4F4F]/40 hover:bg-[#2F4F4F]/5
                                 transition-all duration-300"
                    >
                        <span className="text-sm font-medium">Learn More</span>
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </div>
        </motion.div>
    )
} 