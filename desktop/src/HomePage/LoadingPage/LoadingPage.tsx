import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoadingPage = () => {
    const [javaRunning, setJavaRunning] = useState(false);
    const [sqliteRunning, setSqliteRunning] = useState(false);
    const [pythonRunning, setPythonRunning] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const backend  = async()=>{
            const response = await axios.get('http://localhost:8080/test');
            console.log(response.data)
            if(response.data === "yes"){
                setJavaRunning(true);
            }
        }
        backend();      
    }, []);

    useEffect(()=>{
        const sqlite = async()=>{
            const response = await axios.get('http://localhost:8080/sqlite');
            if(response.data == 'yes'){
                setSqliteRunning(true);
            }
        }
        sqlite();
    }, []);

    useEffect(()=>{
        const python = async()=>{
            const response = await axios.get('http://localhost:8000/test');
            if(response.data == 'yes'){
                setPythonRunning(true);
            }
        }
        python();
    }, []); 

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <div className="flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold">Loading...</h1>
                {javaRunning && <h1 className="text-2xl font-bold">Java is running</h1>}
                {sqliteRunning && <h1 className="text-2xl font-bold">Sqlite is running</h1>}
                {pythonRunning && <h1 className="text-2xl font-bold">Python may take some time to start , Keep refreshing inside the app</h1>}
            </div>
            
            <button 
                onClick={() => navigate('/app')}
                className="px-8 py-3 bg-[#2F4F4F] text-white rounded-xl 
                         shadow-md hover:shadow-xl transition-all duration-300 
                         hover:bg-[#1F3F3F] font-medium"
            >
                Continue to App
            </button>
        </div>
    );
};