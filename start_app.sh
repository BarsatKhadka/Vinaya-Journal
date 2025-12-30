#!/bin/bash

# Function to kill all background processes on exit
cleanup() {
    echo "Stopping all services..."
    # Kill all child processes in the same process group
    trap - SIGINT SIGTERM # Clear the trap
    kill -- -$$ 
    exit
}

trap cleanup SIGINT SIGTERM EXIT

echo "Starting Vinaya Journal..."

# Ensure mvnw is executable
chmod +x backend/app/mvnw

# Start Backend
echo "Starting Backend (Spring Boot)..."
(cd backend/app && ./mvnw spring-boot:run) &
BACKEND_PID=$!

# Start AI Service
echo "Starting AI Service (Python)..."
if [ -d "ai/venv" ]; then
    (cd ai && source venv/bin/activate && python main.py) &
else
    echo "Warning: ai/venv not found. Attempting to run with system python..."
    (cd ai && python main.py) &
fi
AI_PID=$!

# Start Desktop App
echo "Starting Desktop App (Electron/Vite)..."
(cd desktop && npm run dev) &
DESKTOP_PID=$!

echo "All services started. Press Ctrl+C to stop."

# Wait for any process to exit
wait $BACKEND_PID $AI_PID $DESKTOP_PID
