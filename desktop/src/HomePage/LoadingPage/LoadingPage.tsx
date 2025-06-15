import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export const LoadingPage = () => {
    const [javaRunning, setJavaRunning] = useState(false);
    const [sqliteRunning, setSqliteRunning] = useState(false);
    const [pythonRunning, setPythonRunning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const backend = async() => {
            const response = await axios.get('http://localhost:8080/test');
            console.log(response.data)
            if(response.data === "yes"){
                setJavaRunning(true);
            }
        }
        backend();      
    }, []);

    useEffect(() => {
        const sqlite = async() => {
            const response = await axios.get('http://localhost:8080/sqlite');
            console.log(response.data)
            if(response.data === true){
                setSqliteRunning(true);
            }
        }
        sqlite();
    }, []);

    useEffect(() => {
        const python = async() => {
            const response = await axios.get('http://localhost:8000/test');
            if(response.data == 'yes'){
                setPythonRunning(true);
            }
        }
        python();
    }, []); 

    const StatusItem = ({ title, status, description }: { title: string; status: boolean; description?: string }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20"
        >
            <div className="flex-shrink-0">
                {status ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                    <Loader2 className="w-6 h-6 text-[#2F4F4F] animate-spin" />
                )}
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-medium text-[#2F4F4F]">{title}</h3>
                {description && (
                    <p className="text-sm text-[#2F4F4F]/70 mt-1">{description}</p>
                )}
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen w-full bg-[#fbf8f0] flex flex-col items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full space-y-6"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-serif text-[#2F4F4F] mb-3"
                    >
                        Starting Vinaya
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-[#2F4F4F]/70"
                    >
                        Please wait while we prepare your journaling environment
                    </motion.p>
                </div>

                {/* Status Items */}
                <div className="space-y-4">
                    <StatusItem 
                        title="Java Backend" 
                        status={javaRunning}
                    />
                    <StatusItem 
                        title="SQLite Database" 
                        status={sqliteRunning}
                    />
                    <StatusItem 
                        title="Python AI Service" 
                        status={pythonRunning}
                        description="If the model is loading, you can proceed and refresh the app later with Ctrl+R"
                    />
                </div>

                {/* Continue Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center mt-8"
                >
                    <button 
                        onClick={() => navigate('/app')}
                        className="group flex items-center gap-3 px-8 py-4 
                                 bg-[#2F4F4F] text-white rounded-xl 
                                 shadow-md hover:shadow-xl
                                 transition-all duration-300 ease-out
                                 hover:bg-[#1F3F3F] relative
                                 border border-white/5"
                    >
                        <div className="absolute inset-0 rounded-xl bg-white/5 
                                      opacity-0 group-hover:opacity-100 
                                      transition-opacity duration-300 cursor-pointer" />
                        <span className="relative text-lg font-medium tracking-wide cursor-pointer">
                            Continue to App
                        </span>
                    </button>
                </motion.div>

                {/* Note about Python */}
                {!pythonRunning && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-sm text-[#2F4F4F]/70 mt-4 p-3 bg-[#2F4F4F]/5 rounded-lg"
                    >
                        <AlertCircle className="w-4 h-4" />
                        <p>
                            Note: (May take a few minutes) If Python service is still loading, you can proceed to the app and refresh (Ctrl+R) when it's ready.
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};