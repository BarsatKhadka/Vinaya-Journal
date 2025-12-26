#!/bin/bash

set -e  # Exit on error

echo "======================================"
echo "  Vinaya Journal - Build Script"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check prerequisites
print_info "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v java &> /dev/null; then
    print_error "Java is not installed. Please install Java first."
    exit 1
fi

if ! command -v mvn &> /dev/null && ! command -v ./mvnw &> /dev/null; then
    print_error "Maven is not installed. Please install Maven first."
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    print_error "Python 3 is not installed. Please install Python 3 first."
    exit 1
fi

if ! command -v ollama &> /dev/null; then
    print_warning "Ollama is not installed. Please install Ollama from https://ollama.com/"
fi

print_info "All prerequisites found!"

# 1. Frontend Setup
print_info "Setting up Frontend..."
cd desktop
npm install
print_info "Frontend dependencies installed!"

# 2. Backend Setup
print_info "Setting up Backend..."
cd ../backend/app
./mvnw clean install
print_info "Backend built successfully!"

# 3. AI Service Setup
print_info "Setting up AI Service..."
cd ../../ai

if [ ! -d "venv" ]; then
    print_info "Creating virtual environment..."
    python3 -m venv venv
fi

print_info "Activating virtual environment and installing dependencies..."
source venv/bin/activate
pip install -r requirements.txt
deactivate

print_info "AI Service setup complete!"

cd ..

echo ""
echo "======================================"
print_info "Build completed successfully!"
echo "======================================"
echo ""
echo "To start the application:"
echo "1. Start backend: cd backend/app && ./mvnw spring-boot:run"
echo "2. Start AI service: cd ai && source venv/bin/activate && uvicorn main:app --reload"
echo "3. Start frontend: cd desktop && npm run dev"
echo ""
echo "Then press Ctrl+R in the app to refresh."
echo "======================================"
